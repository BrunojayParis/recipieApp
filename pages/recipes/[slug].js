import { sanityClient, urlFor} from "../../lib/sanity";
import {PortableText} from '@portabletext/react';
import { useRouter } from "next/router";
import { useState } from "react";



const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    mainImage,
    ingredient[]{
        unit,
        wholeNumber,
        fraction,
        ingredient->{
            name
        },
    },
    instructions
    
}`;

export default function OneRecipe({ data }) {
  const router = useRouter();
  if (router.fallback){
    return <div>Loading...</div>
  }

  const [likes, setLikes] = useState(data.recipe.likes)

  const addLike = async ()=>{
    const res = await fetch("/api/hello",{
      method: "POST",
      body: JSON.stringify({_id: recipe._id}),
    }).catch((error) => console.log(error))

    const data = await res.json()

    setLikes(data.likes)

  }
  const { recipe } = data;
  return (
    <article className="recipe">
      <h1>{recipe.name}</h1>

      <button className="like-button" onClick={addLike}>
        {likes} ❤️
      </button>

      <main className="content">
        <img src={urlFor(recipe?.mainImage).url()} alt={recipe.name} />
        <div className="breakdown">
          <ul className="ingredients">
            {recipe.ingredient?.map((ingredient) => (
              <li key={ingredient._key} className="ingredient">
                {ingredient?.wholeNumber}{" "}
                {ingredient?.fraction}{" "} {ingredient?.unit}
                <br />
                {ingredient?.ingredient?.name}
              </li>
            ))}
          </ul>
          <PortableText
            value={recipe?.instructions}
            className="instructions"
          />
        </div>
      </main>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "recipe" && defined(slug.current)]{
            "params": {
                "slug": slug.current
            }
        }`
  );
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const recipe = await sanityClient.fetch(recipeQuery, { slug });
  return { props: { data: { recipe } } };
}
