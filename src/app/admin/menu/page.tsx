"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { menuService } from "@/lib/api/menu/menu.service";
import { Menu } from "@/types/menu";

export default function AdminMenuPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuName, setMenuName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const loadMenus = async () => {
    try {
      const data = await menuService.getMenus();
      setMenus(data);
    } catch (error) {
      console.error("Failed to load menu", error);
    }
  };

  useEffect(() => {
    const fetchMenus = async () => {
      await loadMenus();
    };

    fetchMenus();
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const createMenu = async () => {
    if (!menuName || !price) return;

    try {
      let imageUrl = "";

      if (file) {
        const upload = await menuService.uploadImage(file);
        imageUrl = upload.imageUrl;
      }

      await menuService.createMenu({
        menuName,
        price: Number(price),
        description,
        image: imageUrl,
      });

      setMenuName("");
      setPrice("");
      setDescription("");
      setFile(null);
      setPreview("");

      await loadMenus();
    } catch (error) {
      console.error("create menu failed", error);
    }
  };

  const deleteMenu = async (id: string) => {
    try {
      await menuService.deleteMenu(id);
      await loadMenus();
    } catch (error) {
      console.error("delete menu failed", error);
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Menu</h1>

      {/* create menu */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <input
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="Menu name"
          className="border p-2 rounded"
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 rounded"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 rounded w-64"
        />

        <input
          type="file"
          onChange={handleFile}
          className="border p-2 rounded"
        />

        <button
          onClick={createMenu}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* preview */}
      {preview && (
        <div className="mb-6">
          <p className="text-sm mb-2">Preview</p>

          <Image
            src={preview}
            alt="preview"
            width={128}
            height={128}
            className="object-cover rounded border"
          />
        </div>
      )}

      {/* menu list */}
      <div className="space-y-4">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              {menu.image && (
                <Image
                  src={menu.image}
                  alt={menu.menuName}
                  width={64}
                  height={64}
                  className="object-cover rounded"
                />
              )}

              <div>
                <div className="font-semibold">{menu.menuName}</div>
                <div className="text-gray-500 text-sm">{menu.description}</div>
                <div className="text-orange-500 font-bold">฿{menu.price}</div>
              </div>
            </div>

            <button
              onClick={() => deleteMenu(menu.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
