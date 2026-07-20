/**
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 * Class Name      : ProductController
 * Author          : Vikaskumar
 * Created Date    : Jul 20, 2026
 * Last Modified By: Jul 20, 2026
 * Last Modified On: Jul 20, 2026
 * Description     : This class implements for get Product List .
 *  
 * Change History  :
 *  Date          │   Author     │   Change
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 *  Jul 20, 2026  │ Vikaskumar   │ Initial version
 * ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
 */

public class ProductController {
    
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts() {
        return [SELECT Id, Name, ProductCode FROM Product2 LIMIT 10];
    }

     @AuraEnabled(cacheable=true)
    public static Product2 getProductByCode (String productCode) {
        return [SELECT Id, Name, ProductCode, Description
                FROM Product2
                WHERE ProductCode = :productCode
                LIMIT 1];
    }
}