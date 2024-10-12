import httpService from './httpService';

export const getTags = (search) => {
    if (search) {
      search = `search=${search}`;
    }
    return [
        {
            id: 1,
            name: "tag1"
        },
        {
            id: 2,
            name: "tag2"
        },
        {
            id: 3,
            name: "tag3"
        },
        {
            id: 4,
            name: "tag4"
        },
        {
            id: 5,
            name: "tag5"
        },
        {
            id: 6,
            name: "tag6"
        },
        {
            id: 7,
            name: "tag7"
        },
        {
            id: 8,
            name: "tag8"
        },
        {
            id: 9,
            name: "tag9"
        },
        {
            id: 10,
            name: "tag10"
        },
    ]
};
  
export const createTag = (data) => {
    console.log(data);
    // return await httpService.post('/tags', data);
    return { data: { id: 11, name: data.name } };
}