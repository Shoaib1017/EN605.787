describe('menu service', function () {

  var menuService;
  var $httpBackend;
  var ApiBasePath;
  var validShortname = 'L16';
  var validResponse = {"id":208,"short_name":"L16","name":"Beef String Bean","description":"sliced beef sauteed with string beans and onions","price_small":null,"price_large":9.75,"small_portion_name":null,"large_portion_name":null,"created_at":"2022-05-10T02:35:49.983Z","updated_at":"2022-05-10T02:35:49.983Z","category_short_name":"L","image_present":true}
  var invalidShortname = 'XYXAA';
  var invalidResponse = 'Internal Server Error';

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
    });
  });

  it('should return a valid response from the Menu Service', function () {
    $httpBackend.whenGET(`${ApiBasePath}/menu_items/${validShortname}.json`).respond(200, validResponse);
    menuService.getSingleItemName(validShortname).then(function (response) {
      expect(response).toEqual(validResponse);
    });
    $httpBackend.flush();
  });

  it('should return a invalid response from the Menu Service', function () {
    $httpBackend.whenGET(`${ApiBasePath}/menu_items/${invalidShortname}.json`).respond(500, invalidResponse);
   menuService.getSingleItemName(invalidShortname)
      .catch(function(err) {
        expect(err.status).toEqual(500);
      });
    $httpBackend.flush();
  });

});