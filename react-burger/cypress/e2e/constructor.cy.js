const staticResponseIngredient = {
  success: true,
  data: [
    {
      calories: 420,
      carbohydrates: 53,
      fat: 24,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      name: "Краторная булка N-200i",
      price: 1255,
      proteins: 80,
      type: "bun",
      __v: 0,
      _id: "643d69a5c3f7b9001cfa093c",
    },
    { calories: 4242,
      carbohydrates: 242,
      fat: 142,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      name: "Биокотлета из марсианской Магнолии",
      price: 424,
      proteins: 420,
      type: "main",
      __v: 0,
      _id: "643d69a5c3f7b9001cfa0941",

    }
  ],
};
const staticResponseUser = {
  success: true,
  user: { email: "lerabukareva@icloud.com", name: "Lera" },
};
const staticResponseOrder = {
  success: true,
  name: "Бессмертный space астероидный метеоритный краторный бургер",
  order: {
    number: 9277,
  },
};
const baseUrl = "http://localhost:3000";
const ingredientUrl = `/ingredients/643d69a5c3f7b9001cfa093c`;
const apiUrl = "https://norma.nomoreparties.space/api";
const ingredientsApiUrl = `${apiUrl}/ingredients`;
const authApiUrl = `${apiUrl}/auth/user`;
const ordersApiUrl = `${apiUrl}/orders`;
describe("service is available", function () {
  it("should be available on localhost:3000", function () {
    cy.visit(baseUrl);
  });
});

describe("start with right page", () => {
  before(function () {
    cy.visit(baseUrl);
  });
  it("should open constructor page by default", function () {
    cy.get("[data-testid=main-title]").should("have.text", "Соберите бургер");
  });
});
describe("open modal window with ingredient after click on ingredient card", () => {
  beforeEach(function () {
    cy.visit(baseUrl);
    cy.intercept("GET", ingredientsApiUrl, staticResponseIngredient);
  });

  it("should open modal window with ingredient after click on ingredient card ", function () {
    cy.get("#Булки a").click();
    cy.get("[data-testid=modal]").should("be.visible");
  });

  it("should open modal window with right url ", function () {
    cy.get("#Булки a").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq(ingredientUrl);
    });
  });
});
describe("show ingredient info in modal", () => {
  beforeEach(function () {
    cy.visit(`${baseUrl}${ingredientUrl}`);
    cy.intercept("GET", ingredientsApiUrl, staticResponseIngredient);
  });
  it("should show modal with ingredient info ", function () {
    cy.get("[data-testid=modal-header]").should(
      "have.text",
      "Детали ингредиента"
    );
    cy.get("img").invoke("attr", "alt").should("eq", "ингредиент");
    cy.get("h3").should("have.text", "Краторная булка N-200i");
    cy.get("[data-testid=nutrition]")
      .find("li")
      .eq(0)
      .should("have.text", "Калории,ккал420");
    cy.get("[data-testid=nutrition]")
      .find("li")
      .eq(1)
      .should("have.text", "Белки, г80");
    cy.get("[data-testid=nutrition]")
      .find("li")
      .eq(2)
      .should("have.text", "Жиры, г24");
    cy.get("[data-testid=nutrition]")
      .find("li")
      .eq(3)
      .should("have.text", "Углеводы, г53");
  });
});

describe("close modal", () => {
  beforeEach(function () {
    cy.visit(`${baseUrl}${ingredientUrl}`);
    cy.intercept("GET", ingredientsApiUrl, staticResponseIngredient);
  });
  it("should close modal after click on close-icon", () => {
    cy.get("[data-testid=modal]").should("exist");
    cy.get("[data-testid=close-icon]").click();
    cy.get("[data-testid=modal]").should("not.exist");
  });
});
const Dnd = () => {
  cy.wrap(["Булки", "Начинки"]).each((category) => {
    cy.get(`[data-testid=card-0-${category}]`)
      .trigger("dragstart")
      .trigger("dragleave");

    cy.get("[data-testid=drop-area]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");
  });
};
describe("Drag and Drop", () => {
  before(function () {
    cy.visit(baseUrl);
    cy.intercept("GET", ingredientsApiUrl, staticResponseIngredient)
  });
  it("should moves the ingredient card", () => {
    Dnd();
  });
});
describe("click to open order modal window without auth", () => {
  beforeEach(function () {
    cy.visit(baseUrl);
    cy.intercept("GET", ingredientsApiUrl, staticResponseIngredient)
  });
  it("should be disabled to click", () => {
    cy.get("button").should("be.disabled");
  });
  it("should navigate to login", () => {
    Dnd();
    cy.get("button").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
  });
});

describe("click to open order modal window with auth", () => {
  beforeEach(() => {
    cy.setCookie("accessToken", "value");
    cy.intercept("GET", ingredientsApiUrl, staticResponseIngredient)
    cy.intercept("GET", authApiUrl, staticResponseUser);
    cy.intercept("POST", ordersApiUrl, staticResponseOrder);
    cy.visit(baseUrl);
    Dnd();
  });
  it("should open modal window with order info", () => {
    cy.get("button").click();
    cy.get("[data-testid=modal]");
  });
  it("should open modal with order info", () => {
    cy.get("button").click();
    cy.get("[data-testid=order-number]").should("have.text", "9277");
  });
});
