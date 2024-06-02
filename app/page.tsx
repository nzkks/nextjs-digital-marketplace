import ProductRow from './components/ProductRow';

export default function Home() {
  return (
    <section className="mx-auto mb-24 max-w-7xl px-4 md:px-8">
      <div className="mx-auto max-w-3xl text-center text-2xl font-semibold sm:text-5xl lg:text-6xl">
        <h1>Find the best digital products</h1>
        <h1 className="text-primary">Templates, Icons & Ui Kits</h1>
        <p className="mx-auto mt-5 w-[90%] text-base font-normal text-muted-foreground lg:text-lg">
          NZKKS Digital Marketplace stands out as the premier marketplace for
          all things related to digital products, offering an unparalleled
          platform for both sellers and buyers alike.
        </p>
      </div>

      <ProductRow category="newest" />
    </section>
  );
}
