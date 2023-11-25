import renderer from "react-test-renderer";

import Image from "../../components/image";

describe("<Image />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Image source={{ uri: '' }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
