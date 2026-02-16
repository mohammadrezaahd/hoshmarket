import type { ICategoryAttr } from "~/types/interfaces/attributes.interface";
import type { ICategoryDetails } from "~/types/interfaces/details.interface";

/**
 * Parse AI suggested title and extract badge selections
 * Format: "text {\"field_name\":\"field_value\"} more text"
 * Returns: { parsedText: string, selectedBadges: { [key: string]: string } }
 */
export const parseTitleWithBadges = (
  suggestedTitle: string,
  attributesData: ICategoryAttr[],
  detailsData: ICategoryDetails[]
): {
  parsedText: string;
  selectedBadges: { [key: string]: string };
  selectedBadgesLabels: { [key: string]: string };
} => {
  const selectedBadges: { [key: string]: string } = {};
  const selectedBadgesLabels: { [key: string]: string } = {};
  let parsedText = suggestedTitle;

  // Find all JSON objects in the title (format: {"field":"value"})
  const jsonMatches = suggestedTitle.match(/\{[^}]+\}/g);

  if (!jsonMatches) {
    return { parsedText, selectedBadges, selectedBadgesLabels };
  }

  // Process each JSON match
  jsonMatches.forEach((jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const key = Object.keys(parsed)[0];
      const value = parsed[key];

      // Find the field in attributes or details
      let fieldId: string | null = null;

      const normalizedKey = key?.toString().trim();

      // Search in attributes
      for (const attrData of attributesData) {
        if (attrData.category_group_attributes) {
          for (const group of Object.values(attrData.category_group_attributes)) {
            for (const attr of Object.values(group.attributes)) {
              const attrId = attr.id?.toString();
              const attrCode = attr.code?.toString();
              const attrTitle = attr.title?.toString();

              // Match by title/code/id (dynamic numeric keys like "6477" should match attr.id)
              const isAttributeKeyMatch =
                attrTitle === normalizedKey ||
                attrCode === normalizedKey ||
                attrId === normalizedKey;

              if (isAttributeKeyMatch) {
                fieldId = attr.code || attr.id.toString();
                
                // Find matching value ID
                let foundValue = false;
                if (attr.values) {
                  for (const [valueId, valueData] of Object.entries(attr.values)) {
                    if (valueData.text === value || valueData.code === value) {
                      selectedBadges[fieldId] = valueId;
                      selectedBadgesLabels[fieldId] = valueData.text;
                      foundValue = true;
                      break;
                    }
                  }
                }

                // If attribute matched by key but value not found, still mark badge with suggested label
                if (!foundValue) {
                  selectedBadges[fieldId] = "";
                  selectedBadgesLabels[fieldId] = value;
                }
                break;
              }
            }
            if (fieldId) break;
          }
        }
        if (fieldId) break;
      }

      // Search in details if not found in attributes
      if (!fieldId) {
        for (const detailData of detailsData) {
          if (detailData.bind) {
            const bind = detailData.bind;
            
            // Check brand
            if ((key === "brand" || key === "برند") && bind.brands) {
              const brand = bind.brands.find((b) => b.text === value || b.id.toString() === value.toString());
              fieldId = "brand";
              if (brand) {
                selectedBadges[fieldId] = brand.id.toString();
                selectedBadgesLabels[fieldId] = brand.text;
              } else {
                // No matching brand value found, still mark brand badge with suggested label
                selectedBadges[fieldId] = "";
                selectedBadgesLabels[fieldId] = value;
              }
              break;
            }

            // Check model (alias for brand_model chip placeholder)
            if ((key === "model" || key === "مدل" || key === "brand_model") && bind.brand_model) {
              fieldId = "model";
              selectedBadges[fieldId] = value?.toString() || "";
              selectedBadgesLabels[fieldId] = value?.toString() || "";
              break;
            }

            // Check status
            if ((key === "status" || key === "وضعیت") && bind.statuses) {
              const status = bind.statuses.find((s) => s.text === value || s.value === value);
              fieldId = "status";
                if (status) {
                selectedBadges[fieldId] = status.value;
                selectedBadgesLabels[fieldId] = status.text || value;
              } else {
                selectedBadges[fieldId] = "";
                selectedBadgesLabels[fieldId] = value;
              }
              break;
            }

            // Check platform
            if ((key === "platform" || key === "پلتفرم") && bind.platforms) {
              const platform = bind.platforms.find((p) => p.text === value || p.value === value);
              fieldId = "platform";
              if (platform) {
                selectedBadges[fieldId] = platform.value;
                selectedBadgesLabels[fieldId] = platform.text || value;
              } else {
                selectedBadges[fieldId] = "";
                selectedBadgesLabels[fieldId] = value;
              }
              break;
            }

            // Check product_class
            if ((key === "product_class" || key === "کلاس محصول") && bind.product_classes) {
              const productClass = bind.product_classes.find((pc) => pc.text === value || pc.value === value);
              fieldId = "product_class";
              if (productClass) {
                selectedBadges[fieldId] = productClass.value;
                selectedBadgesLabels[fieldId] = productClass.text || value;
              } else {
                selectedBadges[fieldId] = "";
                selectedBadgesLabels[fieldId] = value;
              }
              break;
            }

            // Check category_product_type
            if ((key === "category_product_type" || key === "نوع محصول") && bind.category_product_types) {
              const productType = bind.category_product_types.find((pt) => pt.text === value || pt.value === value);
              fieldId = "category_product_type";
              if (productType) {
                selectedBadges[fieldId] = productType.value;
                selectedBadgesLabels[fieldId] = productType.text || value;
              } else {
                selectedBadges[fieldId] = "";
                selectedBadgesLabels[fieldId] = value;
              }
              break;
            }
          }
        }
      }

      // Remove the JSON part from the title and replace with placeholder
      // Use fieldId if found, otherwise use key
      if (fieldId) {
        parsedText = parsedText.replace(jsonStr, `{${fieldId}}`);
      } else {
        // If no fieldId found, just remove the JSON part
        parsedText = parsedText.replace(jsonStr, value);
      }
    } catch (error) {
      console.warn("Failed to parse JSON in title:", jsonStr, error);
    }
  });

  return { parsedText, selectedBadges, selectedBadgesLabels };
};

/**
 * Reverse function: build title from badges
 * Used when user selects badges manually
 */
export const buildTitleFromBadges = (
  baseText: string,
  selectedBadges: { [key: string]: { label: string; value: string } }
): string => {
  let title = baseText;

  // Replace placeholders with badge values
  Object.entries(selectedBadges).forEach(([key, badge]) => {
    const placeholder = `{${key}}`;
    if (title.includes(placeholder)) {
      title = title.replace(placeholder, badge.label);
    }
  });

  return title;
};
