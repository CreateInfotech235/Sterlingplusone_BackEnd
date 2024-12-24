var express = require("express");
var router = express.Router();
const heroController = require("../../controller/Web/hero.controller");
const menuController = require("../../controller/Web/menu.controller");

const heroOurTeamController = require("../../controller/Web/heroOurTeam.controller");
const heroChooseUsController = require("../../controller/Web/heroChooseUs.controller");
const heroPlansController = require("../../controller/Web/heroPlans.controller");
const navBarController = require("../../controller/Web/navBar.controller");
const heroOurServicesController = require("../../controller/Web/heroourServices.controller");
const servicesPageController = require("../../controller/Web/servicesPage.controller");
const blogPageController = require("../../controller/Web/blogPage.controller");
const servicesPageSectionController = require("../../controller/Web/servicesPageSection.controller");
const ourPartnerController = require("../../controller/Web/ourPartner.controller");
const blogPageSectionController = require("../../controller/Web/blogPageSection.controller");
const contectUsController = require("../../controller/Web/contectUs.controller");
const aboutAsController = require("../../controller/Web/aboutAs.controller");
const footerController = require("../../controller/Web/footer.controller");
const contactPageController = require("../../controller/Web/contectuspage.controller");
const allBlogController = require("../../controller/Web/allblogcontroller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express Admin" });
}); 


// Create a new hero section
router.post("/hero", heroController.createHeroSection);

// Get all hero sections
router.get("/heroes", heroController.getHeroSections);

// Get a hero section by ID
router.get("/hero/:id", heroController.getHeroSectionById);

// Update a hero section by ID
router.put("/hero/:id", heroController.updateHeroSection);

// Delete a hero section by ID
router.delete("/hero/:id", heroController.deleteHeroSection);




// Create a new navbar
router.post("/navbar", navBarController.createNavBar);

// Get all navbars
router.get("/navbars", navBarController.getNavBars);

// Get a navbar by ID
router.get("/navbar/:id", navBarController.getNavBarById);

// Update a navbar by ID
router.put("/navbar/:id", navBarController.updateNavBar);

// Delete a navbar by ID
router.delete("/navbar/:id", navBarController.deleteNavBar);



// Create a new menu
router.post("/menu", menuController.createMenu);

// Get all menus
router.get("/menus", menuController.getMenus);

// Get a menu by ID
router.get("/menu/:id", menuController.getMenuById);

// Update a menu by ID
router.put("/menu/:id", menuController.updateMenu);

// Delete a menu by ID
router.delete("/menu/:id", menuController.deleteMenu);



// Create a new hero our services
router.post("/heroourservices", heroOurServicesController.createHeroOurServices);

// Get all hero our services
router.get("/heroourservices", heroOurServicesController.getHeroOurServices);

// Get a hero our services by ID
router.get("/heroourservices/:id", heroOurServicesController.getHeroOurServicesById);

// Update a hero our services by ID
router.put("/heroourservices/:id", heroOurServicesController.updateHeroOurServices);

// Delete a hero our services by ID
router.delete("/heroourservices/:id", heroOurServicesController.deleteHeroOurServices);



// Create a new hero plan
router.post("/heroplan", heroPlansController.createHeroPlans);

// Get all hero plans
router.get("/heroplans", heroPlansController.getHeroPlans);

// Get a hero plan by ID
router.get("/heroplan/:id", heroPlansController.getHeroPlansById);

// Update a hero plan by ID
router.put("/heroplan/:id", heroPlansController.updateHeroPlans);

// Delete a hero plan by ID
router.delete("/heroplan/:id", heroPlansController.deleteHeroPlans);





// Create a new hero choose us
router.post("/herochooseus", heroChooseUsController.createHeroChooseUs);

// Get all hero choose us
router.get("/herochooseus", heroChooseUsController.getHeroChooseUs);

// Get a hero choose us by ID
router.get("/herochooseus/:id", heroChooseUsController.getHeroChooseUsById);

// Update a hero choose us by ID
router.put("/herochooseus/:id", heroChooseUsController.updateHeroChooseUs);

// Delete a hero choose us by ID
router.delete("/herochooseus/:id", heroChooseUsController.deleteHeroChooseUs);




// Create a new hero our team
router.post("/heroourteam", heroOurTeamController.createHeroOurTeam);

// Get all hero our teams
router.get("/heroourteam", heroOurTeamController.getHeroOurTeams);

// Get a hero our team by ID
router.get("/heroourteam/:id", heroOurTeamController.getHeroOurTeamById);

// Update a hero our team by ID
router.put("/heroourteam/:id", heroOurTeamController.updateHeroOurTeam);

// Delete a hero our team by ID
router.delete("/heroourteam/:id", heroOurTeamController.deleteHeroOurTeam);





// Create a new services page
router.post("/servicespage", servicesPageController.createServicesPage);

// Get all services pages
router.get("/servicespages", servicesPageController.getServicesPages);

// Get a services page by ID
router.get("/servicespage/:id", servicesPageController.getServicesPageById);

// Update a services page by ID
router.put("/servicespage/:id", servicesPageController.updateServicesPage);


// Create a new blog page
router.post("/blogpage", blogPageController.createBlogPage);

// Get all blog pages
router.get("/blogpages", blogPageController.getBlogPages);

// Get a blog page by ID
router.get("/blogpage/:id", blogPageController.getBlogPageById);

// Update a blog page by ID
router.put("/blogpage/:id", blogPageController.updateBlogPage);

// Delete a blog page by ID
router.delete("/blogpage/:id", blogPageController.deleteBlogPage);



// Create a new services page section
router.post("/servicespagesection", servicesPageSectionController.createServicesPageSection);

// Get all services page sections
router.get("/servicespagesections", servicesPageSectionController.getServicesPageSections);

// Get a services page section by ID
router.get("/servicespagesection/:id", servicesPageSectionController.getServicesPageSectionById);

// Update a services page section by ID
router.put("/servicespagesection/:id", servicesPageSectionController.updateServicesPageSection);

// Delete a services page section by ID
router.delete("/servicespagesection/:id", servicesPageSectionController.deleteServicesPageSection);


// Create a new our partner
router.post("/ourpartner", ourPartnerController.createOurPartnerSection);

// Get all our partners
router.get("/ourpartners", ourPartnerController.getOurPartnerSections);

// Get a our partner by ID
router.get("/ourpartner/:id", ourPartnerController.getOurPartnerSectionById);

// Update a our partner by ID
router.put("/ourpartner/:id", ourPartnerController.updateOurPartnerSection);

// Delete a our partner by ID
router.delete("/ourpartner/:id", ourPartnerController.deleteOurPartnerSection);


// Create a new blog page section
router.post("/blogpagesection", blogPageSectionController.createBlogPageSection);

// Get all blog page sections
router.get("/blogpagesections", blogPageSectionController.getBlogPageSections);

// Get a blog page section by ID
router.get("/blogpagesection/:id", blogPageSectionController.getBlogPageSectionById);

// Update a blog page section by ID
router.put("/blogpagesection/:id", blogPageSectionController.updateBlogPageSection);

// Delete a blog page section by ID
router.delete("/blogpagesection/:id", blogPageSectionController.deleteBlogPageSection);


// Create a new contect us
router.post("/contectus", contectUsController.createContectUs);

// Get all contect us
router.get("/contectus", contectUsController.getContectUs);

// Get a contect us by ID
router.get("/contectus/:id", contectUsController.getContectUsById);

// Update a contect us by ID
router.put("/contectus/:id", contectUsController.updateContectUs);

// Delete a contect us by ID
router.delete("/contectus/:id", contectUsController.deleteContectUs);


// Create a new about as
router.post("/aboutas", aboutAsController.createAboutAs);

// Get all about as
router.get("/aboutas", aboutAsController.getAboutAsSections);

// Get a about as by ID
router.get("/aboutas/:id", aboutAsController.getAboutAsById);

// Update a about as by ID
router.put("/aboutas/:id", aboutAsController.updateAboutAs);

// Delete a about as by ID
router.delete("/aboutas/:id", aboutAsController.deleteAboutAs);


// Create a new footer
router.post("/footer", footerController.createOrUpdateFooter);

// Get all footer
router.get("/footer", footerController.getFooter);  

// Update a footer by ID
router.put("/footer/:id", footerController.updateFooterById);

// Delete a footer by ID
router.delete("/footer/:id", footerController.deleteFooterById);


// Create contact page
router.post("/contactpage", contactPageController.createContactPage);

// Get contact page
router.get("/contactpage", contactPageController.getContactPage);

// Update contact page
router.put("/contactpage/:id", contactPageController.updateContactPage);

// Delete contact page
router.delete("/contactpage/:id", contactPageController.deleteContactPage);


// Create a new all blog
router.post("/allblog", allBlogController.createAllBlog);

// Get all blogs 
router.get("/allblogs", allBlogController.getAllBlogs);

// Get an all blog by title or id
router.get("/getBlogByQuery", allBlogController.getBlogByTitle);

// Get default blog
router.get("/defaultblog", allBlogController.getDefaultBlog);

// Update an all blog by ID
router.patch("/allblog/:id", allBlogController.updateAllBlog);

// Delete an all blog by ID
router.delete("/allblog/:id", allBlogController.deleteAllBlog);


module.exports = router;
