public class FutureHandler {

   // ✓ CORRECT — No parameters (valid)
    @future
    public static void myFutureMethod() {
        // business logic here
    }

    // ✓ CORRECT — Primitive parameters only
    @future
    public static void processRecords(List<Id> recordIds, String status) {
        List<Account> accs = [SELECT Id, Name FROM Account WHERE Id IN :recordIds];
        for (Account a : accs) { 
            a.Status = status; 
        }
        update accs;
    }

    // ✓ CORRECT — Callout annotation
    @future(callout=true)
    public static void makeCallout(String endpoint) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('GET');
        Http http = new Http();
        HttpResponse res = http.send(req);
    }

    // ✗ WRONG — sObject parameter not allowed
    @future
    public static void badMethod(Account acc) { }  // Compile ERROR

    // ✗ WRONG — Non-void return
    @future
    public static String badReturn() { return 'x'; }  // Compile ERROR
}