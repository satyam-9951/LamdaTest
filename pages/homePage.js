class HomePage{
    constructor(page)
    {
        this.page=page;
        this.amazonLogo="//a[@aria-label='Amazon.in']";
        this.inputBox="//input[@id='twotabsearchtextbox']";
        this.searchBtn="//input[@value='Go']";
        this.iphone13="(//h2[contains(@aria-label,'Apple iPhone 13')])[1]";
        this.iphone13Price="(//h2[contains(@aria-label,'Apple iPhone 13')])[1]/ancestor::div[@class='puisg-col-inner']//span[contains(@class,'price-whole')]";
    }

    async openUrl(url){
        if (!this.page) {
            throw new Error("Page is not initialized! Ensure 'new HomePage(page)' is used.");
        }
        await this.page.goto(url);
        await this.page.waitForLoadState();
    }
    async searchInput(value){  
        await this.page.waitForSelector(this.inputBox);
        await this.page.fill(this.inputBox,value);  //iphone 13
    }
    async clickSearchBtn(){
        await this.page.click(this.searchBtn);
    }
    async getPhonePrice() {
        await this.page.waitForSelector(this.iphone13);
        await this.page.waitForSelector(this.iphone13Price);
        const price = await this.page.$(this.iphone13Price);
        return await this.page.locator(this.iphone13Price).textContent();
    }
    async checkUrl(){
        const url=this.page.url();
        return url;
    }
    async checkLogo(){
        return await this.page.locator(this.amazonLogo).isVisible();
    }

}
module.exports= HomePage;
