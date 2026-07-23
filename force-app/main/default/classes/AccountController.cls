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

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Phone, Industry FROM Account ORDER BY CreatedDate ];
    }

    @AuraEnabled
    public static void updateAccounts(List<Id> recordIds, String industry) {
        try {
            List<Account> accountsToUpdate = new List<Account>();
            for (Id recId : recordIds) {
                accountsToUpdate.add(new Account(Id = recId, Industry = industry));
            }
            update accountsToUpdate;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Account> getAllAccounts() {
        return [SELECT Id, Name, Industry, Rating, Phone, Fax, Description, AnnualRevenue FROM Account];
    }

    @AuraEnabled
    public static List<Account> getAllAccountsByIndustry(String industry) {
        return [SELECT Id, Name, Industry, Rating, Phone, Fax, Description, AnnualRevenue
                FROM Account
                WHERE Industry = :industry];
    }
}