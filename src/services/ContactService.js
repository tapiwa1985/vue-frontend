import http from '../http-common';

class ContactService 
{
    create(data)
    {
        return http.post("/contacts", data);
    }
}
export default new ContactService();