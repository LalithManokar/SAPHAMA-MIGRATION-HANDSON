import  po_create_before_exit  from './handlers/purchaseOrderExits.js';
import my_create_after_exit, { my_update_after_exit } from './handlers/userExit.js';

   export default (srv) => {

   srv.on('CREATE','Users', async (req) => {
      const userdata = await my_create_after_exit(req);
      return userdata;
   });

   srv.on('UPDATE','Users', async (req) => {
      const userupdate = await my_update_after_exit(req);
      return userupdate;
   });
        
   srv.on('CREATE','purchaseDetails', async (req) => {
      const poid = await po_create_before_exit(req.data);
      return { message: `Purchase Order ${poid} created successfully` };
   });
}