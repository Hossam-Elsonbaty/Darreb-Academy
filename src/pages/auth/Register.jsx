
import DynamicHero from "../../common/dynamic-components/DynamicHero";
import authorImg from "../../assets/images/author-11.jpg";
import React from 'react'
import { useForm } from "react-hook-form"

export default function Register (){
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it
  return (
    <div className="px-4 md:px-15 lg:px-30 xl:px-40">
      <DynamicHero
        links={{
          en: ["Home", "Register"],

          ar: ["الرئيسية", "انشاء حساب"],
        }}
        authorImg={authorImg}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

