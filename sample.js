/**
 * @author Jonatan Gall 
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.example.basic.registerThirdPartServiceOnDevice} tx
 * @transaction
 */
async function registerThirdPartServiceOnDevice(tx) {  // eslint-disable-line no-unused-vars

    if(tx.owner !=  tx.device.owner){
        throw new Error('Owner not registered on this device')
    }
    
    const allowedUsers = tx.device.allowedUsers;
    if(allowedUsers.find((allowedUser) => allowedUser.thirdPartServiceId == tx.thirdPartService.thirdPartServiceId)){
        throw new Error('Third Party Service already been registered on this device')
    }
    try{
        tx.device.allowedUsers.push(tx.thirdPartService);
    }catch(e) {
        throw new Error('Cannot add users on this device ==> ', e);
    }
    let assetRegistry = await getAssetRegistry('org.example.basic.Device');
    await assetRegistry.update(tx.device);
}
/**
 * Transaction remove a third part services from allowed services on device array participant
 * @param {org.example.basic.removeThirdPartServiceOnDevice} tx
 * @transaction
 */
async function removeThirdPartServiceOnDevice(tx) {  // eslint-disable-line no-unused-vars

    if(tx.owner !=  tx.device.owner){
        throw new Error('Owner not registered on this device')
    }
    
    const allowedUsers = tx.device.allowedUsers;
    if(!allowedUsers.find((allowedUser) => allowedUser.thirdPartServiceId == tx.thirdPartService.thirdPartServiceId)){
        throw new Error('Third Party Service is not registered on this device')
    }
    try{
        tx.device.allowedUsers = allowedUsers.filter((el) => el.thirdPartServiceId != tx.thirdPartService.thirdPartServiceId);
    }catch(e) {
        throw new Error('Cannot add users on this device ==> ', e);
    }

    let assetRegistry = await getAssetRegistry('org.example.basic.Device');
    await assetRegistry.update(tx.device);
}
/**
 * Transaction grant access to allowed Third Part Users
 * @param {org.example.basic.grantThirdPartServicePermitionOnDevice} tx
 * @transaction
 */
async function grantThirdPartServicePermitionOnDevice(tx) {  // eslint-disable-line no-unused-vars
    const allowedUsers = tx.device.allowedUsers;
    let access = false
    if(allowedUsers.includes(tx.thirdPartService)){
        access = true;
    }
    // Emit an event asset.
    let event = getFactory().newEvent('org.example.basic', 'AccessEvent');
    event.thirdPartService = tx.thirdPartService
    event.device = tx.device;
    event.access = access;
    emit(event);
}