@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation::class)

class ApiWalletTest{
    private lateinit var api: Javalin

    @BeforeAll fun setUp() {
        api = Api(8000).init()
        // Inject the base path to no have repeat the whole URL
        FuelManager.instance.basePath = "http://localhost:${api.port()}/"
    }

    @AfterAll fun tearDown() {
        api.stop()
    }

}