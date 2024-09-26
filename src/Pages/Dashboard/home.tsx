import BillsChart from "./Analytics/BillsChart/billsChart";
import LatestBills from "./LatestBills/latestBills";
import IncomeChart from "./Analytics/IncomeChart/incomeChart";
import { useTranslation } from "react-i18next";

const Home = () => {
    const {t} = useTranslation()
    return ( 
        <article className="Home-wrapper w-full h-full">
            <div className="flex flex-wrap md:flex-nowrap gap-y-3 md:gap-x-3 justify-between items-start w-full h-full">

                <section className="home-latestBills-wrapper basis-full md:basis-[30%] h-auto lg:h-full shadow-md px-3 py-4 bg-white rounded-md">
                    <section className="latest-bill-title mt-1">
                        <h1 className="text-lg font-semibold text-mainDark">{t('home.latestAdded')}</h1>
                    </section>
                    
                    <section>
                        <LatestBills t={t} />
                    </section>
                </section>

                <section className="home-analytics-wrapper basis-full md:basis-[69%] h-full flex flex-col gap-y-3 justify-between [&>div]:basis-[49%] [&>div]:bg-white [&>div]:px-3 [&>div]:py-4 [&>div]:shadow-md [&>div]:rounded-md">
                    <div className="bills-reports-analytics-wrapper">
                        <div className="h-full">
                            <BillsChart t={t} />
                        </div>
                    </div>

                    <div className="Income-analytics-wrapper">
                        <div className="h-full">
                            <IncomeChart t={t} />
                        </div>
                    </div>
                </section>
            </div>
        </article>
    );
}

export default Home;