/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.example.basic.registerThirdPartServiceOnDevice} registerService The sample transaction instance.
 * @transaction
 */
async function registerThirdPartServiceOnDevice(registerService) {  // eslint-disable-line no-unused-vars

    if(registerService.owner !=  registerService.device.owner){
        throw new Error('Owner not registered on this device')
    }
    
    const allowedUsers = registerService.device.allowedUsers;
    if(allowedUsers.find((allowedUser) => allowedUser.thirdPartServiceId == registerService.thirdPartService.thirdPartServiceId)){
        throw new Error('Third Party Service already been registered on this device')
    }
    try{
        registerService.device.allowedUsers.push(registerService.thirdPartService);
    }catch(e) {
        throw new Error('Cannot add users on this device ==> ', e);
    }
    let assetRegistry = await getAssetRegistry('org.example.basic.Device');
    await assetRegistry.update(registerService.device);
}
/* global getAssetRegistry getFactory emit */

/**
 * Sample transaction processor function.
 * @param {org.example.basic.removeThirdPartServiceOnDevice} registerService The sample transaction instance.
 * @transaction
 */
async function removeThirdPartServiceOnDevice(registerService) {  // eslint-disable-line no-unused-vars

    if(registerService.owner !=  registerService.device.owner){
        throw new Error('Owner not registered on this device')
    }
    
    const allowedUsers = registerService.device.allowedUsers;
    if(!allowedUsers.find((allowedUser) => allowedUser.thirdPartServiceId == registerService.thirdPartService.thirdPartServiceId)){
        throw new Error('Third Party Service is not registered on this device')
    }
    try{
        registerService.device.allowedUsers = allowedUsers.filter((el) => el.thirdPartServiceId != registerService.thirdPartService.thirdPartServiceId);
    }catch(e) {
        throw new Error('Cannot add users on this device ==> ', e);
    }

    let assetRegistry = await getAssetRegistry('org.example.basic.Device');
    await assetRegistry.update(registerService.device);
}