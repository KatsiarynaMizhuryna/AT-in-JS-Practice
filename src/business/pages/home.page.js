import Page from "../../core/pages/base.page";

class HomePage extends Page {
  get header() {
    return $("app-header");
  }

  get powerTools() {
    return $('[data-test="nav-power-tools"]');
  }

  get categoriesLink() {
    return $('[data-test="nav-categories"]');
  }

  get dropDownMenu() {
    return $("ul.dropdown-menu.show");
  }

  get signIn() {
    return $('[data-test="nav-sign-in"]');
  }

  get languageButton() {
    return $('[data-test="language-select"]');
  }

  get languageDe() {
    return $('[data-test="lang-de"]');
  }

  async clicklanguageButton() {
    await this.languageButton.click();
  }

  async clicklanguageDe() {
    await this.languageDe.click();
  }
}

export default new HomePage();
