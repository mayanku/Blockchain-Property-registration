# Blockchain-Property-registration
<p>Property Registration is a project that aims at registering property/ land and preventing frauds of the same.
It is a mere record of sales transaction using Blockchain technology developed using Hyperledger Composer.</p>

Overview of the Network:-
1. Participants: Buyer, Seller, Registrar
2. Assets: Property, PropertyListing <br>
PropertyListing will contain only property which are for sale
3. Transactions: Created, IntentForSale, Registered <br>
<p>In transaction Created we are changing the status of the property if IntentForSale is checked and if Public is also checked, the asset value is added to the PropertyListing asset.<br/></p>
<p>In transaction IntentForSale,Property which is for sale and are checked as Private are taken from Property asset and Sales transaction is done. <br></p>
<p>Property which are for sale and are checked as Public are taken from PropertyListing asset and Sales transaction is done. After the transaction takes place, there is a change in Buyer and Sellers Balance, Property Owner and the Status from IntentForSale to Registered<br></p>
<p>In transaction Registered, the property value whose Status is Registered are added to the Property asset and removed from PropertyListing asset.</p>
<h3> Click on the image and check the demo video</h3>
<div align="center">
  <a href="https://drive.google.com/open?id=1Ok1oYLdaGeEBVx7xW7r3TVUEgWTGMJ5M"><img src="https://github.com/mayanku/Blockchain-Property-registration/blob/master/Screenshot%20(94).png" alt="IMAGE ALT TEXT"></a>
</div>
