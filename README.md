# Hyper IoT Network

> This Hyperledger Composer Model, which demonstrates the permition system of IoT devices using Hyperledger Composer by changing the value of an asset.

This business network defines:

**Participant**
`Owner, ThirdPartServices`

**Asset**
`Device`

**Transaction**
`registerThirdPartServiceOnDevice, removeThirdPartServiceOnDevice, grantThirdPartServicePermitionOnDevice`

**Event**
`SampleEvent`

Device are owned by a Owner, and the value property on a device can be modified by submitting a register or remove transaction. Third Part Services can access data if they are registered on allowedUser on device.

To test this Definition in the **Test** tab:

Create a `Owner` participant:

```
{
  "$class": "org.example.basic.Owner",
  "participantId": "jhon",
  "firstName": "Jhon",
  "lastName": "Doe"
}
```

Create a `ThirdPartService` participant:

```
{
  "$class": "org.example.basic.Owner",
  "participantId": "serviceId:1",
  "name": "Google Analytics",
  "description": "This service using data to assemble a dashboard"
}
```

Create a `Device` asset:

```
{
  "$class": "org.example.basic.SampleAsset",
  "assetId": "assetId:1",
  "owner": "resource:org.example.basic.SampleParticipant#jhon",
  "name": "Camera example"
  "description": "This camera is using for monitoring propose"
  "allowedUsers": []
}
```

Submit a `grantThirdPartServicePermitionOnDevice` transaction:

```
{
  "$class": "org.example.basic.grantThirdPartServicePermitionOnDevice",
  "thirdPartService": "resource:org.example.basic.ThirdPartService#serviceId:1",
  "device": "resource:org.example.basic.Device#assetId:1"
}
```

After submitting this transaction, you should now see the transaction in the Transaction Registry if the service is allowed to get data from this device.

Submit a `registerThirdPartServiceOnDevice` transaction:

```
{
  "$class": "org.example.basic.registerThirdPartServiceOnDevice",
  "owner": "resource:org.example.basic.Owner#jhon",
  "thirdPartService": "resource:org.example.basic.ThirdPartService#serviceId:1",
  "device": "resource:org.example.basic.Device#assetId:1"
}
```

After submitting this transaction, you should now see the transaction in the Transaction Registry a service inside the `allowedUsers` array on `Device#assetId:1`

Submit a `removeThirdPartServiceOnDevice` transaction:

```
{
  "$class": "org.example.basic.registerThirdPartServiceOnDevice",
  "owner": "resource:org.example.basic.Owner#jhon",
  "thirdPartService": "resource:org.example.basic.ThirdPartService#serviceId:1",
  "device": "resource:org.example.basic.Device#assetId:1"
}
```

After submitting this transaction, you should now see the transaction in the Transaction Registry and the service inside the `allowedUsers` array on `Device#assetId:1` will be removed

## License
 
The MIT License (MIT)