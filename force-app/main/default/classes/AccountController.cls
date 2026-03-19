public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Type, Industry FROM Account LIMIT 5];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> filterAccounts(String type) {
        return [SELECT Id, Name, Type, Industry FROM Account WHERE Type=: type LIMIT 5];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> filterAccountsString(String seachKey) {
        String key = '%' + seachKey + '%';
        return [SELECT Id, Name, Type, Industry FROM Account 
        WHERE Name  like :key LIMIT 5];
    }
}