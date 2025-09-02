
//converted from: /home/user/projects/ShineDemo/core-xsjs/lib/sap/hana/democontent/epm/services/userExit.xsjslib

export default async function my_create_after_exit(req) {
    try {
        let first_name = req.data.FirstName;
        let last_name = req.data.LastName;
        let email = req.data.Email;
        if (!email || email.trim() === ''){
            req.error("Invalid email");
        }
        await INSERT.into('USERDATA_USER').entries({
            'FIRSTNAME': first_name,
            'LASTNAME': last_name,
            'EMAIL': email
        });
        return req.data;
    } catch (e) {
        console.error(e);
    }
}

export async function my_update_after_exit(req) {
    try {
        let FirstName = req.data.FirstName;
        let LastName = req.data.LastName;
        let Email = req.data.Email;
        let UserId = req.data.UserId;
        await UPDATE('USERDATA_USER').set({ 
            FIRSTNAME: FirstName, 
            LASTNAME: LastName,
            EMAIL: Email 
        }).where({ USERID: UserId});
        return req.data;
    } catch (e) {
        console.error(e);
    }
}