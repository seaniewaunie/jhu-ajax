describe('Verify Favorite Exists Test', function () {

  var menuService;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should verify that the favorite doesnt exist', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/' + "giberish" + '.json').respond(400, {});
    menuService.verifyFavorite("giberish").then(function(response) {
      expect(response).toEqual(false);
    });
    $httpBackend.flush();
  });

  it('should verify that the favorite does exist', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/' + "L3" + '.json').respond(200, {});
    menuService.verifyFavorite("L3").then(function(response) {
      expect(response).toEqual(true);
    });
    $httpBackend.flush();
  });

});
