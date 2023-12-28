import { Select,Button } from "@chakra-ui/react";
import { blue } from "@mui/material/colors";

export default function Filter() {
  return (
    <>
      <section className="container m-auto mt-4">
        <aside className="flex justify-between items-center">
          <span className="font-semibold text-neutral-600">
            Search by categories :{" "}
          </span>
          <ul>
            <li><Button textColor={blue} fontSize={14}>Pulls</Button></li>
          </ul>
          <div>
            <Select placeholder="Filter by :">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
        </aside>
      </section>
    </>
  );
}
