import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    title:string;
    description:string;
    selectedService:string | null;
    updateService:Dispatch<SetStateAction<string | null>>;
    keyword:string;
}

function MiniServiceCard({title,description,selectedService,updateService,keyword}: Props) {
  return <>
    <div className={`flex items-center space-x-4 rounded-md border p-4  hover:bg-white hover:text-black cursor-pointer ${selectedService === keyword ? "bg-white text-black" : "text-white"}`} onClick={() => updateService(keyword)}>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              {title}
            </p>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
  
  </>
}

export default MiniServiceCard