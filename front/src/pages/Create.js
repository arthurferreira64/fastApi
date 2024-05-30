import React from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { createItem } from "../axios/item";
import { showToastMessage } from "../utils/common";
import * as Yup from "yup";
import { Field, Form, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(`Titre requis`),
    description: Yup.string().required(`Contenu requis`),
  });

  //Valeurs initiales du formulaire
  const initialValues = {
    title: "",
    description: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    //Soumission du formulaire
    onSubmit: (values) => {
      const title = values.title;
      const description = values.description;

      //call api pour creer le blog
      createItem({ description, title })
        .then((res) => {
          showToastMessage("Item ajouté", "success");
          navigate("../");
          formik.resetForm();
        })
        .catch((err) => {
          showToastMessage("erreur veuillez réssayer", "error");
        });
      try {
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form className="bg-white p-6 rounded-xl">
        <h2 className="font-bold text-xl text-center">Créer un item</h2>
        <Field
          type="text"
          id="title"
          as={Input}
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          placeholder="Titre du blog"
          label="Titre"
          error={{
            name: formik.errors.title,
            touched: formik.touched.title,
          }}
        />
        <Field
          type="text"
          id="description"
          as={Input}
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          placeholder="Contenu du blog"
          label="Contenu"
          error={{
            name: formik.errors.description,
            touched: formik.touched.description,
          }}
        />

        <div className="flex justify-end mt-4">
          <Button type="submit">Créer</Button>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default Create;
