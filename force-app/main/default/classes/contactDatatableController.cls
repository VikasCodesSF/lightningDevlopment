/**
 * Apex controller backing the Contact Datatable LWC.
 *
 * Notes:
 * - Marked @AuraEnabled(cacheable=true) so the client can cache results when appropriate.
 * - The LWC clones the returned records before adding any display-only fields to avoid mutating
 *   framework-managed objects in the browser.
 * - We explicitly select atomic Mailing* fields (Street/City/State/PostalCode/Country) to ensure
 *   consistent serialization for LWC, instead of relying solely on the compound MailingAddress.
 * - Id and AccountId are included to build record/account URLs in the LWC.
 */
public class contactDatatableController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        return [
            SELECT Id, AccountId, Name, Account.Name, Phone, Email,
                   MailingStreet, MailingCity, MailingState, MailingPostalCode, MailingCountry
            FROM Contact
        ];
    }
}
