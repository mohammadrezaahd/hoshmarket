import React from "react";
import type { ICategoryAttr } from "~/types/interfaces/attributes.interface";
import AttributesFormFields from "~/components/templates/attributes/AttributesFormFields";

interface ProductAttributesFormProps {
  data: ICategoryAttr;
  formData: { [key: string]: any };
  onFormDataChange: (fieldId: number | string, value: any) => void;
  validationErrors?: { [key: string]: string };
  categoryId?: number | null;
  aiData?: ICategoryAttr;
}

const ProductAttributesForm: React.FC<ProductAttributesFormProps> = ({
  data,
  formData,
  onFormDataChange,
  validationErrors = {},
  categoryId,
  aiData,
}) => {
  const aiTemplateData = React.useMemo(() => {
    const finalData = JSON.parse(JSON.stringify(data)) as ICategoryAttr;

    if (finalData.category_group_attributes) {
      Object.keys(finalData.category_group_attributes).forEach((groupId) => {
        const groupData = finalData.category_group_attributes[groupId];

        Object.keys(groupData.attributes).forEach((attributeId) => {
          const attr = groupData.attributes[attributeId];
          const fieldKey = attr.code || attr.id.toString();
          const formValue = formData[fieldKey];
          const hasFormValue = fieldKey in formData;

          if (!hasFormValue) {
            return;
          }

          switch (attr.type) {
            case "input":
              attr.value =
                formValue !== null && formValue !== undefined
                  ? formValue.toString()
                  : "";
              break;

            case "text":
              if (
                formValue !== null &&
                formValue !== undefined &&
                formValue !== ""
              ) {
                attr.value = {
                  original_text: formValue.toString(),
                  translated_text: formValue.toString(),
                  is_translated: false,
                  src: "ai",
                } as any;
              } else {
                attr.value = null as any;
              }
              break;

            case "select":
              Object.keys(attr.values || {}).forEach((valueId) => {
                attr.values[valueId].selected = false;
              });

              if (formValue && attr.values?.[formValue]) {
                attr.values[formValue].selected = true;
              }
              break;

            case "checkbox":
              Object.keys(attr.values || {}).forEach((valueId) => {
                attr.values[valueId].selected = false;
              });

              if (Array.isArray(formValue) && formValue.length > 0) {
                formValue.forEach((selectedId: string) => {
                  if (attr.values?.[selectedId]) {
                    attr.values[selectedId].selected = true;
                  }
                });
              }
              break;
          }
        });
      });
    }

    return finalData;
  }, [data, formData]);

  const resolvedAiData = React.useMemo(() => {
    return aiTemplateData;
  }, [aiTemplateData]);

  // Wrapper - pass fieldId as-is (can be string or number)
  const handleFormDataChange = (fieldId: string | number, value: any) => {
    onFormDataChange(fieldId, value);
  };

  return (
    <AttributesFormFields
      attributesData={data}
      formData={formData}
      onFormDataChange={handleFormDataChange}
      validationErrors={validationErrors}
      categoryId={categoryId}
      aiData={resolvedAiData}
    />
  );
};

export default ProductAttributesForm;