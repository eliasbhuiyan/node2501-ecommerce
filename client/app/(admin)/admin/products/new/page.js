"use client";
import {
  useCreateNewProductMutation,
  useGetCategoriesQuery,
} from "@/app/(admin)/services/api";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { categories } from "@/data/categories";
import { generateSlug } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateProductPage() {
  const [createNewProduct, { isError }] = useCreateNewProductMutation();
  const { data: categoryList } = useGetCategoriesQuery();
  const [variants, setVariants] = useState([
    {
      id: Date.now(),
      sku: `NM-${Math.floor(Math.random() * 100000)}`,
      color: "",
      size: "",
      stock: "",
    },
  ]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    variants: "",
    tags: "",
    thumbnail: null,
    images: [],
  });

  const handelAddNewVariant = () => {
    let existingVariants = [...variants];
    existingVariants.push({
      id: Date.now(),
      sku: `NM-${Math.floor(Math.random() * 100000)}`,
      color: "",
      size: "",
      stock: "",
    });

    setVariants(existingVariants);
  };
  const handelCancleVariant = (id) => {
    if (variants.length > 1) {
      const updatedVariantList = variants.filter((vitem) => vitem.id !== id);
      setVariants(updatedVariantList);
      setNewProduct((prev) => ({ ...prev, variants: updatedVariantList }));
    }
  };

  const handelInputVariant = (id, field, value) => {
    let variantInputChange = variants.map((vitem) => {
      if (vitem.id == id) {
        vitem[field] = value;
      }
      return vitem;
    });
    setVariants(variantInputChange);
    setNewProduct((prev) => ({ ...prev, variants: variantInputChange }));
  };

  const handelImages = (e) => {
    let imags = [...newProduct.images];
    imags.push(e.target.files[0]);
    setNewProduct((prev) => ({ ...prev, images: imags }));
  };
  const handelRemoveImg = (i) => {
    const imgs = newProduct.images.filter((item, idx) => idx !== i && item);
    setNewProduct((prev) => ({ ...prev, images: imgs }));
  };
  const handelUploadNewProduct = async (e) => {
    e.preventDefault();
    // Form Data
    const formData = new FormData();
    // add file/file_id if there is one
    for (const items in newProduct) {
      if (items == "variants") {
        formData.append(items, JSON.stringify(newProduct[items]));
      } else if (items == "images") {
        newProduct.images.forEach((file) => {
          formData.append("images", file);
        });
      } else {
        formData.append(items, newProduct[items]);
      }
    }
    const res = await createNewProduct(formData);
    console.log(res);
    if (isError) {
      toast.error(res.message);
    }
    toast.success(res.message);
  };
  return (
    <>
      <AdminPageHeader
        title="Create New Product"
        description="Design-only form using dummy fields based on your product schema."
      />
      <Toaster />
      <section className="rounded-3xl mt-16 border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form
          onSubmit={handelUploadNewProduct}
          className="grid gap-4 md:grid-cols-2"
        >
          <Input
            value={newProduct.title}
            onChange={(e) => {
              setNewProduct((prev) => ({ ...prev, title: e.target.value }));
              setNewProduct((prev) => ({
                ...prev,
                slug: generateSlug(e.target.value),
              }));
            }}
            placeholder="Enter product title"
            label="Title"
          />
          <Input
            value={newProduct.slug}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, slug: e.target.value }))
            }
            placeholder="product-slug"
            label="Slug"
          />

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Category
            </span>
            <select
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full rounded-xl border capitalize border-slate-200 px-4 py-2.5 text-sm"
            >
              {categoryList?.data?.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  className="capitalize"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <Input
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
            min={1}
            type="number"
            placeholder="0"
            label="Price"
          />
          <Input
            value={newProduct.discountPercentage}
            onChange={(e) =>
              setNewProduct((prev) => ({
                ...prev,
                discountPercentage: e.target.value,
              }))
            }
            max={100}
            min={0}
            type="number"
            placeholder="0"
            label="Discount Percentage"
          />

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">
              Description
            </span>
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
              placeholder="Write product description"
            />
          </label>
          <Input
            value={newProduct.tags}
            onChange={(e) =>
              setNewProduct((prev) => ({ ...prev, tags: e.target.value }))
            }
            placeholder="e.g hoodie, winter, street"
            label="Tags (comma separated)"
          />
          <div>
            <Input
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  thumbnail: e.target.files[0],
                }))
              }
              type="file"
              label="Upload Thumbnail"
            />
            <div className="mt-5">
              {newProduct.thumbnail && (
                <Image
                  src={URL.createObjectURL(newProduct.thumbnail)}
                  width={100}
                  height={200}
                  alt="thumbnail"
                  className="rounded"
                />
              )}
            </div>
          </div>
          <div>
            <div className="mt-5 flex gap-1">
              {newProduct.images.length > 0 &&
                newProduct.images.map((imgUrl, i) => (
                  <div key={imgUrl} className="relative">
                    <Image
                      src={URL.createObjectURL(imgUrl)}
                      width={80}
                      height={100}
                      alt="images"
                      className="rounded border border-slate-600"
                    />
                    <Button
                      onClick={() => handelRemoveImg(i)}
                      variant="danger"
                      size="sm"
                      className="absolute top-0 right-0"
                    >
                      X
                    </Button>
                  </div>
                ))}
            </div>
            <Input
              onChange={handelImages}
              type="file"
              label="Images"
              multiple
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-slate-700">
                Variant Sample
              </p>
              <Button variant="secondary" onClick={handelAddNewVariant}>
                + Add Variant
              </Button>
            </div>
            {variants.map((vitem) => (
              <div
                key={vitem.id}
                className="mt-2 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-13"
              >
                <input
                  value={vitem.sku}
                  onChange={(e) =>
                    handelInputVariant(vitem.id, "sku", e.target.value)
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm col-span-3"
                  placeholder="SKU"
                />
                <input
                  value={vitem.color}
                  onChange={(e) =>
                    handelInputVariant(vitem.id, "color", e.target.value)
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm col-span-3"
                  placeholder="Color"
                />
                <select
                  value={vitem.size}
                  onChange={(e) =>
                    handelInputVariant(vitem.id, "size", e.target.value)
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm col-span-3"
                >
                  {["s", "m", "l", "xl", "2xl", "3xl"].map((size) => (
                    <option key={size} value={size}>
                      {size.toUpperCase()}
                    </option>
                  ))}
                </select>
                <input
                  value={vitem.stock}
                  onChange={(e) =>
                    handelInputVariant(vitem.id, "stock", e.target.value)
                  }
                  type="number"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm col-span-3"
                  placeholder="Stock"
                />

                {variants.length > 1 && (
                  <Button
                    onClick={() => handelCancleVariant(vitem.id)}
                    variant="danger"
                    className="w-10 ml-auto col-span-1"
                  >
                    x
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="md:col-span-2 flex gap-3 pt-2">
            <Button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
            >
              Save Product
            </Button>
            <Button
              type="reset"
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700"
            >
              Reset
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
