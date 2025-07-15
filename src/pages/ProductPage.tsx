import { commonErrorService } from "@/shared/page/services/ErrorService";
import { PageComponent } from "@/shared/page/view";
import { useCallback } from "react";

const PageContent = (props: { pageData: object }) => {
    return <div> тут будет контент страницы страницы </div>
}

const fetchPageData = (...args) => {
    return Promise.resolve((res) => {
        res({
            id: 1,
            name: 'тестовый товар',
            description: 'Тестовое описание'
        });
    })
}

const ProductPage = () => {
    const dataFetcher = useCallback(() => {
        const productId = 1;
        return fetchPageData(productId);
    }, []);

    return <PageComponent
        errorService={commonErrorService} pageId={"product-page"}
        renderContent={PageContent} />
}

ProductPage.displayName = 'ProductPage';

export default ProductPage;