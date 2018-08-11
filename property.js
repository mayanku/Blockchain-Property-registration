/*
* Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* global getAssetRegistry getParticipantRegistry getFactory emit */

/**
* Sample transaction processor function.
* @param {org.example.empty.IntentForSale} tx The sample transaction instance.
* @transaction
*/
async function sampleTransaction(tx) { // eslint-disable-line no-unused-vars

console.log(&#39;### onsampleTransaction &#39; + tx.toString());
if(tx.property.owner== tx.seller.Sname){ //check in property asset

if(tx.property.Status=="IntentForSale"){ // Run only for Sale + Private
if(tx.property.Private=true){
// Save the value of the property.
const MktValue = tx.property.mktprice;
var owner= tx.property.owner;
alert("Old Owner is " + owner);
var bbalance= tx.buyer.BBalance; //Buyer Balance
var sbalance= tx.seller.SBalance; //Seller Balance

if(bbalance>= MktValue) {
bbalance = bbalance- MktValue;
alert("New Bbalance is " + bbalance);
tx.buyer.BBalance=bbalance;
tx.property.owner=tx.buyer.Bname;
tx.property.Status="Registered";
alert("New owner is" + tx.property.owner);
alert("Status is " + tx.property.Status);
sbalance= sbalance+ MktValue;
alert("New Sbalance is" + sbalance);
tx.seller.SBalance=sbalance;

const OwnerRegistry = await getAssetRegistry(&#39;org.example.basic.Property&#39;);
// Update the owner of Property.
await OwnerRegistry.update(tx.property);

const statusRegistry = await getAssetRegistry(&#39;org.example.basic.Property&#39;);
// Update status IntentForSale to Registered.
await statusRegistry.update(tx.property);

const BuyerRegistry = await getParticipantRegistry(&#39;org.example.basic.Buyer&#39;);
// Update the balance in the participant registry.
await BuyerRegistry.update(tx.buyer);

const SellerRegistry = await getParticipantRegistry(&#39;org.example.basic.Seller&#39;);
// Update the balance in the participant registry.
await SellerRegistry.update(tx.seller);
}
}
}
}

// Check in PropertyListing asset

else{
if(tx.propertylisting.owner== tx.seller.Sname){
if(tx.propertylisting.Status=="IntentForSale"){

// Save the value of the property.
const MktValue = tx.propertylisting.mktprice;
var owner= tx.propertylisting.owner;

alert("Old Owner is " + owner);
var bbalance= tx.buyer.BBalance; //Buyer Balance
var sbalance= tx.seller.SBalance; //Seller Balance

if(bbalance>= MktValue) {
bbalance = bbalance- MktValue;
alert("New Bbalance is" + bbalance);
tx.buyer.BBalance=bbalance;
tx.propertylisting.owner=tx.buyer.Bname;
tx.propertylisting.Status="Registered";
alert("New owner is" + tx.propertylisting.owner);
alert("Status is " + tx.propertylisting.Status);
sbalance= sbalance+ MktValue;
alert("New Sbalance is " + sbalance);
tx.seller.SBalance=sbalance;

const OwnerRegistry = await getAssetRegistry(&#39;org.example.basic.PropertyListing&#39;);
// Update the owner of Property.
await OwnerRegistry.update(tx.propertylisting);

const statusRegistry = await getAssetRegistry(&#39;org.example.basic.PropertyListing&#39;);
// Update status IntentForSale to Registered.
await statusRegistry.update(tx.propertylisting);

const BuyerRegistry = await getParticipantRegistry(&#39;org.example.basic.Buyer&#39;);

// Update the balance in the participant registry.
await BuyerRegistry.update(tx.buyer);

const SellerRegistry = await getParticipantRegistry(&#39;org.example.basic.Seller&#39;);
// Update the balance in the participant registry.
await SellerRegistry.update(tx.seller);
}}
}
}
}

/**
* Changing status from registered to IntentForSale
* @param {org.example.basic.Created} ifs - the offer
* @transaction
*/

async function Created(ifs){
const namespace = &#39;org.example.basic&#39;;
console.log(&#39;### onCreated &#39; + ifs.toString());
if(ifs.cproperty.Status==&quot;Registered&quot;){
if(ifs.cproperty.IntentForSale= true){
ifs.cproperty.Status=&quot;IntentForSale&quot;;
const statusRegistry = await getAssetRegistry(namespace+&#39;.Property&#39;);
// Update status registered to IntentForSale.

await statusRegistry.update(ifs.cproperty);
alert(&quot;Updated Status&quot;);

if(ifs.cproperty.Public== true){ //Add property from property asset to propertylisting asset
alert(&quot;When Public is true&quot;);
const participantRegistry = await getAssetRegistry(namespace+&#39;.Property&#39;); // eslint-disable-line no-
undef
const transferAssetRegistry = await getAssetRegistry(namespace+&#39;.PropertyListing&#39;); // eslint-disable-
line no-undef

// Use a factory for creation of asset
const factory = getFactory(); // eslint-disable-line no-undef
const transferRequest = factory.newResource(namespace, &#39;PropertyListing&#39;, ifs.PID);

// ifs aspects

transferRequest.owner = ifs.cproperty.owner;
alert("Owner is " + transferRequest.owner);
transferRequest.mktprice= ifs.cproperty.mktprice;
transferRequest.RegistrationDate= ifs.cproperty.RegistrationDate;
transferRequest.PropertyType= ifs.cproperty.PropertyType;
transferRequest.Location= ifs.cproperty.Location;

// Add to asset registry
await transferAssetRegistry.add(transferRequest);
}

}
  var property= ifs.cproperty.PID;     
// Get the property asset registry.
return getAssetRegistry(namespace+'.Property')
  .then(function (propertyAssetRegistry) {
    // Get the factory for creating new asset instances.
    var factory = getFactory();
    // Remove the property from the property asset registry.
    return propertyAssetRegistry.remove(property);
  });
}
}

/**
* Add property from propertylisting asset to property asset which have status=&quot;Registered&quot;
* @param {org.example.basic.Registered} pr - the property
* @transaction
*/

async function Registered(pr){
const namespace = &#39;org.example.basic&#39;;
console.log(&#39;### onRegistered &#39; + pr.toString());
if(pr.rpropertylisting.Status="Registered"){
const propertyRegistry = await getAssetRegistry(namespace+&#39;.PropertyListing&#39;); // eslint-disable-line
no-undef
const transferAssetRegistry = await getAssetRegistry(namespace +&#39;.Property&#39;); // eslint-disable-line
no-undef

// Use a factory for creation of asset
const factory = getFactory(); // eslint-disable-line no-undef
const transferRequest = factory.newResource(namespace, &#39;Property&#39;, pr.PID);

// pr aspects

transferRequest.owner = pr.rpropertylisting.owner;
alert("Owner is "+ transferRequest.owner);
transferRequest.mktprice= pr.rpropertylisting.mktprice;
transferRequest.RegistrationDate= pr.rpropertylisting.RegistrationDate;
transferRequest.PropertyType= pr.rpropertylisting.PropertyType;
transferRequest.Location= pr.rpropertylisting.Location;
transferRequest.Status= "Registered";
transferRequest.IntentForSale= false;
transferRequest.Public= false;
transferRequest.Private= false;

// Add to asset registry
await transferAssetRegistry.add(transferRequest);

//Remove asset value which is added in property asset
var property= pr.rpropertylisting.PLID;
// Get the property asset registry.
return getAssetRegistry(namespace+&#39;.PropertyListing&#39;)
.then(function (propertyAssetRegistry) {
// Get the factory for creating new asset instances.
var factory = getFactory();
// Remove the property from the propertyListing asset registry.
return propertyAssetRegistry.remove(property);
});

}
}

PERMISSION FILE

/*
* Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
* Sample access control list.
*/
rule NetworkAdminUser {
description: &quot;Grant business network administrators full access to user resources&quot;
participant: &quot;org.hyperledger.composer.system.NetworkAdmin&quot;
operation: ALL

resource: &quot;**&quot;
action: ALLOW
}

rule NetworkAdminSystem {
description: &quot;Grant business network administrators full access to system resources&quot;
participant: &quot;org.hyperledger.composer.system.NetworkAdmin&quot;
operation: ALL
resource: &quot;org.hyperledger.composer.system.**&quot;
action: ALLOW
}
