export default{
    name: "chef",
    title: "Chef",
    type: "document",
    fields: [{
        name:"name",
        title:"chef's name",
        type: "string"
    },
    {
        name:"image",
        title:"Image",
        type:"image",
        options:{
            hotspot: true
        }
    },
    {
        name:"bio",
        title:"Bio",
        type:"array",
        of:[
            {
                title:"block",
                type:"block",
                styles:[{title:"normal", value:"normal"}],
                lists:[],
            },
        ],
    },

    ],
    
};