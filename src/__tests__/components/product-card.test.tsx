import renderer from "react-test-renderer";

import ProductCard from "../../components/product-card";

describe("<ProductCard />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ProductCard title="title" description="description" image="image" />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
