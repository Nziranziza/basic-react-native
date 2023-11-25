import renderer from "react-test-renderer";

import Button from "../../components/button";

describe("<Button />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Button title="Button" />).toJSON();
    expect(tree).toMatchSnapshot();;
   });
})