import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import dotenv from "dotenv";
import { sign, verify } from "jsonwebtoken";
import prisma from "../../prisma";

dotenv.config();

const secretKey: string = process.env.JWT_SECRET_KEY!;

@Service()
@Middleware({ type: "before" })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (res.locals.needAuthentication) {
      let token: string;
      
      if (req.headers["authentication"]) {
        token = req.headers["authentication"] as string;
        token = token.split(" ")[1];
        try {
          const payload = verify(token, secretKey);
          // @ts-ignore
          req.userId = payload.userId;
        } catch (error) {
          res.status(401).send("Unauthorized");
          return;
        }
      } else {
        const email: string = req.headers['x-authentik-email'] as string;
        // TODO: change at the end
  
        let user = await prisma.account.findUnique({ where: { email } });
        if (!user) {
          // TODO: change at the end
          const name: string = req.headers['x-authentik-name'] as string;
          const username: string = req.headers['x-authentik-username'] as string;
  
          user = await prisma.account.create({
            data: {
              email: email,
              name: name,
              username: username,
            },
          });
        }
  
        // @ts-ignore
        req.userId = user.id;
  
        token = sign({ userId: user.id }, secretKey);
      }

      res.setHeader("Authorization", `Bearer ${token}`);
      res.locals.token = token;
    }
    next();
  }
}
