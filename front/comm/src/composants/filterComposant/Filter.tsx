import { Select,Button } from "@chakra-ui/react";
import { blue } from "@mui/material/colors";

export default function Filter() {
  return (
    <>
      <section className="container m-auto mt-4 px-2 md:px-0">
        <aside className="md:flex justify-between items-center">
          <span className="font-semibold text-neutral-600">
            Search by categories :{" "}
          </span>
          <ul className="mt-2">
            <li><Button textColor={blue} fontSize={14}>Pulls</Button></li>
          </ul>
          <div className="invisible md:visible">
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
