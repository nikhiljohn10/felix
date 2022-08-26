import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';

const result = {
    links: [
        {
            title: "User list",
            link: "http://localhost:4000/user"
        },
        {
            title: "Find user by query",
            link: "http://localhost:4000/user?id=4"
        },
        {
            title: "Find user by params",
            link: "http://localhost:4000/user/6"
        },
        {
            title: "API Documentation",
            link: "http://localhost:4000/documentation"
        }
    ]
}

export default {
    method: 'GET',
    path: '/',
    options: {
        tags: ['api'],
        notes: "Root page",
        handler: (request:Request, h:ResponseToolkit): ResponseObject => {
            return h.response(result);
        }
    }
};
