import { Select,Button } from "@chakra-ui/react";

import { useEffect, useState } from "react";

export default function Filter() {
const [categories, setCategories] = useState([])
const url_base = "http://localhost:8000/"

const  handleData = async () =>{
    const resp = await fetch(url_base+"category")
    const data = await resp.json()
    setCategories(data)
    
}

useEffect(()=>{
    handleData()
   
},[])


const lists = categories.map(item => <li className="mx-2"><Button fontSize={14} size='sm'>{item.name}</Button></li>)
  return (
    <>
      <section className="container m-auto mt-4 px-2 md:px-0">
        <aside className="md:flex justify-between items-center">
          <span className="font-semibold text-neutral-600">
            Search by categories :{" "}
          </span>
          <ul className="mt-2 flex ">
            {lists}
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
