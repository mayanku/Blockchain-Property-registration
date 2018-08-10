# Blockchain-Property-registration
<p>Property Registration is a project that aims at registering property/ land and preventing frauds of the same.
It is a mere record of sales transaction using Blockchain technology developed using Hyperledger Composer.</p>

Overview of the Network:-
1. Participants: Buyer, Seller, Registrar
2. Assets: Property, PropertyListing <br>
PropertyListing will contain only property which are for sale
3. Transactions: Created, IntentForSale, Registered <br>
<p>In transaction <b>Created</b> we are changing the status of the property if IntentForSale is checked and if Public is also checked, the asset value is added to the PropertyListing asset.<br/></p>
<p>In transaction <b>IntentForSale</b>,Property which is for sale and are checked as Private are taken from Property asset and Sales transaction is done. <br></p>
<p>Property which are for sale and are checked as Public are taken from PropertyListing asset and Sales transaction is done. After the transaction takes place, there is a change in Buyer and Sellers Balance, Property Owner and the Status from IntentForSale to Registered<br></p>
<p>In transaction <b>Registered</b>, the property value whose Status is Registered are added to the Property asset and removed from PropertyListing asset.</p>
<h3>To test this Business Network Definition in the Test tab:</h3>
<p>In the Buyer participant registry, create a new participant.</p>
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p1.png">
<p>In the Registrar participant registry, create a new participant.</p>
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p2.png">
<p>In the Seller participant registry, create two participants.</p>
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p3.png">
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p4.png">
<p>In the Property asset registry, create two assets of a property identified by PID.</p>
In first asset, the property will be for "IntentForSale" and "Public".
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p5.png">
In Second asset, the property will be for "IntentForSale" and "Private".
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p6.png">
<p>In the PropertyListing asset registry, create a property listing for property PLID:1.</p>
Property which are for "ForSale" can only be there under PropertyListing asset.
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p7.png">
<p>As soon as Property asset has been created, participant can submit “Created” transactions, the status of properties checked for “IntentForSale” will get changed to “IntentForSale” and the properties which are checked for “IntentForSale” and are “Public” are added to “PropertyListing” asset for sale. We are checking for two properties under “Property” asset.</p>
1.	Property which is for “IntentForSale” and is “Public”.
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p8.png">
2.	Property which is for “IntentForSale” and is “Private”. Therefore, only status for this property will change and it will not be added in “PropertyListing” asset.
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p9.png">
In “Created” Transaction, we have taken PID= “2” as Property asset or PropertyListing asset may have different unique ID, therefore, we are taking PID which is unique.
To make a sale agreement between Buyer and Seller, “IntentForSale” transaction is submitted. Here we have two cases:-
1.	Property which are “IntentForSale” and are “Private” can be sold only from “Property” asset. Therefore, we will make a contract for these properties individually.
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p10.png">
2.	Property which are “IntentForSale” and are “Public” can be sold only from “PropertyListing” asset. Therefore, we will make a contract for these properties individually.
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p11.png">

<p>After “IntentForSale” transaction has been completed, the status changes to “Registered”.</p>
<p>In “Registered” transaction, the Properties under “PropertyListing” asset and have status “Registered” are added under “Property” asset and removed from “PropertyListing” asset.</p>
<img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/p12.png">
<bold>Congratulations!</bold>
<p>The sales transaction has been done between Buyer and seller, now the Property owner has been changed, Buyer and Seller balance has been updated.</p>
<h3> Click on the image and check the demo video</h3>
<div align="center">
  <a href="https://drive.google.com/open?id=1Ok1oYLdaGeEBVx7xW7r3TVUEgWTGMJ5M"><img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/Screenshot%20(94).png" alt="IMAGE ALT TEXT"></a>
</div>
