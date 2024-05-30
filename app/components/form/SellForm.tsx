'use client';

import { useState } from 'react';
import { type JSONContent } from '@tiptap/react';
import { toast } from 'sonner';

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadDropzone } from '@/app/lib/uploadthing';
import SelectCategory from '../SelectCategory';
import WYSIWYGEditor from '../WYSIWYGEditor';

const SellForm = () => {
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);

  return (
    <form>
      <CardHeader>
        <CardTitle>Sell your product with ease</CardTitle>
        <CardDescription>
          Please describe your product here in detail so that it can be sold
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label>Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Name of your Product"
            required
            minLength={3}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Category</Label>
          <SelectCategory />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Price</Label>
          <Input
            placeholder="29$"
            type="number"
            name="price"
            required
            min={1}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Small Summary</Label>
          <Textarea
            name="smallDescription"
            placeholder="Pleae describe your product shortly right here..."
            required
            minLength={10}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <input
            type="hidden"
            name="description"
            value={JSON.stringify(json)}
          />
          <Label>Description</Label>
          <WYSIWYGEditor json={json} setJson={setJson} />
        </div>

        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <Label>Product Images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res.map((item) => item.url));
              toast.success('Images uploaded successfully');
            }}
            onUploadError={(error: Error) => {
              toast.error('Something went wrong, try again');
            }}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Product File</Label>
          <UploadDropzone endpoint="productFileUploader" />
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        <Button>Submit form</Button>
      </CardFooter>
    </form>
  );
};

export default SellForm;
