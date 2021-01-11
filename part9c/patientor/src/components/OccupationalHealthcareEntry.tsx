import React from "react";
import { Entry } from "../types";
import { Icon, Item } from "semantic-ui-react";
const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <Item>
        <Item.Content>
          <Item.Header as="a">
            {entry.date}
            <Icon className="briefcase" />
          </Item.Header>

          <Item.Description>{entry.description}</Item.Description>
        </Item.Content>
      </Item>
    </div>
  );
};

export default OccupationalHealthcareEntry;
