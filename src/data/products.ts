export interface ProductItem {
  id: string;
  photo: string;
  name: string;
  price: number;
  unit: string;
  min: number;
  tags: string[];
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  items: ProductItem[];
}

export interface ProductCatalog {
  categories: Category[];
}

export const PRODUCTS: Record<string, ProductCatalog> = {
  cs: {
    categories: [
      {
        id: "kanapky",
        title: "Chlebíčky a kanapky",
        subtitle: "Klasika, která nikdy neomrzí",
        items: [
          { id: "k1", photo: "/images/food/kanapky.jpg", name: "Chlebíček s lososovou pěnou a limetkou", price: 49, unit: "ks", min: 10, tags: ["ryba"] },
          { id: "k2", photo: "/images/food/chlebicky.jpg", name: "Chlebíček se šunkovou rolkou a křenem", price: 39, unit: "ks", min: 10, tags: [] },
          { id: "k3", photo: "/images/food/kanapky.jpg", name: "Kanapka s pečenou kachnou a hruškou", price: 59, unit: "ks", min: 10, tags: [] },
          { id: "k4", photo: "/images/food/spoon-canapes.jpg", name: "Vegetariánská kanapka s grilovaným lilkem", price: 45, unit: "ks", min: 10, tags: ["veg"] },
          { id: "k5", photo: "/images/food/chlebicky.jpg", name: "Kanapka s tatarákem z hovězího", price: 69, unit: "ks", min: 10, tags: [] },
          { id: "k6", photo: "/images/food/kanapky.jpg", name: "Mini bagel s lososem a sýrem", price: 65, unit: "ks", min: 10, tags: ["ryba"] }
        ]
      },
      {
        id: "fingerfood",
        title: "Studené finger food",
        subtitle: "Elegantní sousta na jedno kousnutí",
        items: [
          { id: "f1", photo: "/images/food/spoon-canapes.jpg", name: "Mini caprese s burratou a basalkou", price: 55, unit: "ks", min: 12, tags: ["veg"] },
          { id: "f2", photo: "/images/food/chlebicky.jpg", name: "Tatarák ze sušených rajčat na praženém chlebu", price: 49, unit: "ks", min: 12, tags: ["vegan"] },
          { id: "f3", photo: "/images/food/spoon-canapes.jpg", name: "Krevety v parmské šunce s citrónovým aioli", price: 79, unit: "ks", min: 12, tags: ["ryba"] },
          { id: "f4", photo: "/images/food/chicken-roulade.jpg", name: "Kuřecí roláda s pestem a sušenými rajčaty", price: 59, unit: "ks", min: 12, tags: [] },
          { id: "f5", photo: "/images/food/spoon-canapes.jpg", name: "Tartaletka s kozím sýrem a karamelizovanou cibulkou", price: 55, unit: "ks", min: 12, tags: ["veg"] },
          { id: "f6", photo: "/images/food/spoon-canapes.jpg", name: "Sushi mix (8 ks / porce)", price: 220, unit: "porce", min: 4, tags: ["ryba", "bezlepkové"] }
        ]
      },
      {
        id: "bagety",
        title: "Bagety, croissanty a wrapy",
        subtitle: "Sytější varianta pro pracovní oběd",
        items: [
          { id: "b1", photo: "/images/food/breakfast.jpg", name: "Mini bageta s pečeným kuřetem a rukolou", price: 79, unit: "ks", min: 6, tags: [] },
          { id: "b2", photo: "/images/food/breakfast.jpg", name: "Croissant s parmskou šunkou a sýrem", price: 89, unit: "ks", min: 6, tags: [] },
          { id: "b3", photo: "/images/food/breakfast.jpg", name: "Tortilla wrap s grilovanou zeleninou", price: 75, unit: "ks", min: 6, tags: ["vegan"] },
          { id: "b4", photo: "/images/food/breakfast.jpg", name: "Kaiserka s rostbífem a křenovou majonézou", price: 95, unit: "ks", min: 6, tags: [] },
          { id: "b5", photo: "/images/food/breakfast.jpg", name: "Croissant s lososem a krémovým sýrem", price: 109, unit: "ks", min: 6, tags: ["ryba"] }
        ]
      },
      {
        id: "teple",
        title: "Teplé pokrmy",
        subtitle: "Plnohodnotné menu pro celodenní akce",
        items: [
          { id: "t1", photo: "/images/food/chicken-roulade.jpg", name: "Hovězí svíčková na smetaně, knedlík", price: 245, unit: "porce", min: 10, tags: [] },
          { id: "t2", photo: "/images/food/chicken-roulade.jpg", name: "Kuřecí supreme s lanýžovou omáčkou", price: 285, unit: "porce", min: 10, tags: [] },
          { id: "t3", photo: "/images/food/gnocchi-pesto.jpg", name: "Risotto s lesními houbami a parmazánem", price: 215, unit: "porce", min: 10, tags: ["veg"] },
          { id: "t4", photo: "/images/food/grill-platter.jpg", name: "Pečený losos s citrónovým máslem", price: 325, unit: "porce", min: 10, tags: ["ryba"] },
          { id: "t5", photo: "/images/food/gnocchi-pesto.jpg", name: "Vegan kari z cizrny a sladkých brambor", price: 195, unit: "porce", min: 10, tags: ["vegan"] }
        ]
      },
      {
        id: "salaty",
        title: "Saláty a misky",
        subtitle: "Lehké a zdravé",
        items: [
          { id: "s1", photo: "/images/food/salad-bowl.jpg", name: "Caesar salát s grilovaným kuřetem", price: 165, unit: "porce", min: 6, tags: [] },
          { id: "s2", photo: "/images/food/salad-bowl.jpg", name: "Quinoa bowl s pečenou dýní a fetou", price: 175, unit: "porce", min: 6, tags: ["veg"] },
          { id: "s3", photo: "/images/food/salad-bowl.jpg", name: "Salát Niçoise s tuňákem", price: 195, unit: "porce", min: 6, tags: ["ryba"] },
          { id: "s4", photo: "/images/food/salad-bowl.jpg", name: "Caprese s buvolí mozzarellou", price: 155, unit: "porce", min: 6, tags: ["veg"] }
        ]
      },
      {
        id: "dezerty",
        title: "Mini dezerty",
        subtitle: "Sladká tečka",
        items: [
          { id: "d1", photo: "/images/food/tiramisu.jpg", name: "Macarons mix (vanilka, malina, pistácie)", price: 35, unit: "ks", min: 12, tags: ["veg"] },
          { id: "d2", photo: "/images/food/tiramisu.jpg", name: "Cheesecake v kelímku s lesním ovocem", price: 65, unit: "ks", min: 8, tags: ["veg"] },
          { id: "d3", photo: "/images/food/tiramisu.jpg", name: "Čokoládový brownie", price: 45, unit: "ks", min: 8, tags: ["veg"] },
          { id: "d4", photo: "/images/food/fruit-platter.jpg", name: "Mini ovocný tartaletek", price: 49, unit: "ks", min: 8, tags: ["veg"] }
        ]
      },
      {
        id: "napoje",
        title: "Nápoje",
        subtitle: "Káva, voda a něco navíc",
        items: [
          { id: "n1", photo: "/images/food/breakfast.jpg", name: "Filtrovaná káva (termoska 2,5 l)", price: 390, unit: "ks", min: 1, tags: [] },
          { id: "n2", photo: "/images/food/fruit-platter.jpg", name: "Domácí limonáda (džbán 1,5 l)", price: 220, unit: "ks", min: 1, tags: ["vegan"] },
          { id: "n3", photo: "/images/food/breakfast.jpg", name: "Mattoni perlivá / neperlivá (0,33 l)", price: 35, unit: "ks", min: 6, tags: [] },
          { id: "n4", photo: "/images/food/breakfast.jpg", name: "Prosecco DOC (0,75 l)", price: 450, unit: "ks", min: 1, tags: [] },
          { id: "n5", photo: "/images/food/fruit-platter.jpg", name: "Čerstvý džus pomeranč (0,3 l)", price: 75, unit: "ks", min: 6, tags: ["vegan"] }
        ]
      },
      {
        id: "servis",
        title: "Servis a vybavení",
        subtitle: "Doplňkové služby",
        items: [
          { id: "x1", photo: "/images/food/grill-platter.jpg", name: "Obsluha / číšník (hod.)", price: 350, unit: "hod", min: 4, tags: [] },
          { id: "x2", photo: "/images/food/grill-platter.jpg", name: "Pronájem koktejlového stolku", price: 450, unit: "ks", min: 1, tags: [] },
          { id: "x3", photo: "/images/food/grill-platter.jpg", name: "Porcelán, sklo, příbory (na osobu)", price: 95, unit: "os", min: 10, tags: [] },
          { id: "x4", photo: "/images/food/grill-platter.jpg", name: "Doprava Praha + okolí", price: 590, unit: "akce", min: 1, tags: [] }
        ]
      }
    ]
  },
  en: {
    categories: [
      {
        id: "kanapky",
        title: "Open-faced sandwiches & canapés",
        subtitle: "The timeless Czech classic",
        items: [
          { id: "k1", photo: "/images/food/kanapky.jpg", name: "Salmon mousse with lime", price: 49, unit: "pc", min: 10, tags: ["fish"] },
          { id: "k2", photo: "/images/food/chlebicky.jpg", name: "Ham roll with horseradish", price: 39, unit: "pc", min: 10, tags: [] },
          { id: "k3", photo: "/images/food/kanapky.jpg", name: "Roast duck with pear", price: 59, unit: "pc", min: 10, tags: [] },
          { id: "k4", photo: "/images/food/spoon-canapes.jpg", name: "Vegetarian with grilled aubergine", price: 45, unit: "pc", min: 10, tags: ["veg"] },
          { id: "k5", photo: "/images/food/chlebicky.jpg", name: "Beef tartare canapé", price: 69, unit: "pc", min: 10, tags: [] },
          { id: "k6", photo: "/images/food/kanapky.jpg", name: "Mini bagel with salmon & cream cheese", price: 65, unit: "pc", min: 10, tags: ["fish"] }
        ]
      },
      {
        id: "fingerfood",
        title: "Cold finger food",
        subtitle: "Elegant one-bite portions",
        items: [
          { id: "f1", photo: "/images/food/spoon-canapes.jpg", name: "Mini caprese with burrata & basil", price: 55, unit: "pc", min: 12, tags: ["veg"] },
          { id: "f2", photo: "/images/food/chlebicky.jpg", name: "Sun-dried tomato tartare on toast", price: 49, unit: "pc", min: 12, tags: ["vegan"] },
          { id: "f3", photo: "/images/food/spoon-canapes.jpg", name: "Prawns in Parma ham, lemon aioli", price: 79, unit: "pc", min: 12, tags: ["fish"] },
          { id: "f4", photo: "/images/food/chicken-roulade.jpg", name: "Chicken roulade with pesto", price: 59, unit: "pc", min: 12, tags: [] },
          { id: "f5", photo: "/images/food/spoon-canapes.jpg", name: "Goat cheese tartlet, caramelised onion", price: 55, unit: "pc", min: 12, tags: ["veg"] },
          { id: "f6", photo: "/images/food/spoon-canapes.jpg", name: "Sushi mix (8 pcs / portion)", price: 220, unit: "portion", min: 4, tags: ["fish", "gluten-free"] }
        ]
      },
      {
        id: "bagety",
        title: "Baguettes, croissants & wraps",
        subtitle: "Heartier option for working lunches",
        items: [
          { id: "b1", photo: "/images/food/breakfast.jpg", name: "Mini baguette, roast chicken & rocket", price: 79, unit: "pc", min: 6, tags: [] },
          { id: "b2", photo: "/images/food/breakfast.jpg", name: "Croissant with Parma ham & cheese", price: 89, unit: "pc", min: 6, tags: [] },
          { id: "b3", photo: "/images/food/breakfast.jpg", name: "Tortilla wrap with grilled vegetables", price: 75, unit: "pc", min: 6, tags: ["vegan"] },
          { id: "b4", photo: "/images/food/breakfast.jpg", name: "Kaiser roll with roast beef & horseradish", price: 95, unit: "pc", min: 6, tags: [] },
          { id: "b5", photo: "/images/food/breakfast.jpg", name: "Croissant with salmon & cream cheese", price: 109, unit: "pc", min: 6, tags: ["fish"] }
        ]
      },
      {
        id: "teple",
        title: "Hot dishes",
        subtitle: "Full meals for all-day events",
        items: [
          { id: "t1", photo: "/images/food/chicken-roulade.jpg", name: "Beef sirloin in cream sauce, dumplings", price: 245, unit: "portion", min: 10, tags: [] },
          { id: "t2", photo: "/images/food/chicken-roulade.jpg", name: "Chicken supreme, truffle sauce", price: 285, unit: "portion", min: 10, tags: [] },
          { id: "t3", photo: "/images/food/gnocchi-pesto.jpg", name: "Wild mushroom risotto, parmesan", price: 215, unit: "portion", min: 10, tags: ["veg"] },
          { id: "t4", photo: "/images/food/grill-platter.jpg", name: "Roast salmon, lemon butter", price: 325, unit: "portion", min: 10, tags: ["fish"] },
          { id: "t5", photo: "/images/food/gnocchi-pesto.jpg", name: "Chickpea & sweet potato curry", price: 195, unit: "portion", min: 10, tags: ["vegan"] }
        ]
      },
      {
        id: "salaty",
        title: "Salads & bowls",
        subtitle: "Light and healthy",
        items: [
          { id: "s1", photo: "/images/food/salad-bowl.jpg", name: "Caesar salad with grilled chicken", price: 165, unit: "portion", min: 6, tags: [] },
          { id: "s2", photo: "/images/food/salad-bowl.jpg", name: "Quinoa bowl with roast pumpkin & feta", price: 175, unit: "portion", min: 6, tags: ["veg"] },
          { id: "s3", photo: "/images/food/salad-bowl.jpg", name: "Niçoise salad with tuna", price: 195, unit: "portion", min: 6, tags: ["fish"] },
          { id: "s4", photo: "/images/food/salad-bowl.jpg", name: "Caprese with buffalo mozzarella", price: 155, unit: "portion", min: 6, tags: ["veg"] }
        ]
      },
      {
        id: "dezerty",
        title: "Mini desserts",
        subtitle: "A sweet finish",
        items: [
          { id: "d1", photo: "/images/food/tiramisu.jpg", name: "Macarons mix (vanilla, raspberry, pistachio)", price: 35, unit: "pc", min: 12, tags: ["veg"] },
          { id: "d2", photo: "/images/food/tiramisu.jpg", name: "Cheesecake in a cup with berries", price: 65, unit: "pc", min: 8, tags: ["veg"] },
          { id: "d3", photo: "/images/food/tiramisu.jpg", name: "Chocolate brownie", price: 45, unit: "pc", min: 8, tags: ["veg"] },
          { id: "d4", photo: "/images/food/fruit-platter.jpg", name: "Mini fruit tartlet", price: 49, unit: "pc", min: 8, tags: ["veg"] }
        ]
      },
      {
        id: "napoje",
        title: "Drinks",
        subtitle: "Coffee, water & something extra",
        items: [
          { id: "n1", photo: "/images/food/breakfast.jpg", name: "Filter coffee (2.5 l flask)", price: 390, unit: "pc", min: 1, tags: [] },
          { id: "n2", photo: "/images/food/fruit-platter.jpg", name: "Homemade lemonade (1.5 l jug)", price: 220, unit: "pc", min: 1, tags: ["vegan"] },
          { id: "n3", photo: "/images/food/breakfast.jpg", name: "Mattoni sparkling / still (0.33 l)", price: 35, unit: "pc", min: 6, tags: [] },
          { id: "n4", photo: "/images/food/breakfast.jpg", name: "Prosecco DOC (0.75 l)", price: 450, unit: "pc", min: 1, tags: [] },
          { id: "n5", photo: "/images/food/fruit-platter.jpg", name: "Fresh orange juice (0.3 l)", price: 75, unit: "pc", min: 6, tags: ["vegan"] }
        ]
      },
      {
        id: "servis",
        title: "Service & equipment",
        subtitle: "Add-on services",
        items: [
          { id: "x1", photo: "/images/food/grill-platter.jpg", name: "Waiter / server (hour)", price: 350, unit: "hr", min: 4, tags: [] },
          { id: "x2", photo: "/images/food/grill-platter.jpg", name: "Cocktail table rental", price: 450, unit: "pc", min: 1, tags: [] },
          { id: "x3", photo: "/images/food/grill-platter.jpg", name: "China, glassware, cutlery (per person)", price: 95, unit: "pp", min: 10, tags: [] },
          { id: "x4", photo: "/images/food/grill-platter.jpg", name: "Delivery Prague & surroundings", price: 590, unit: "event", min: 1, tags: [] }
        ]
      }
    ]
  }
};
