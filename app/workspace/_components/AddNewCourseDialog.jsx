import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Sparkle } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ CORRECT for app directory
import { toast } from "sonner";

function AddNewCourseDialog({ children }) {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    includeVideo: false,
    noOfChapters: 1,
    category: "",
    level: "",
  });
  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log({ ...formData, [field]: value });
  };

  const onGenerate = async () => {
    console.log(formData);

    try {
      setloading(true);

      const result = await axios.post("/api/generate-course-layout", {
        ...formData,
      });
      //console.log("result.data");
      if (result.data.resp == "limit exceed") {
        toast.warning("please subscribed to plan");
        router.push(`/workspace/billing`);
      }
      setloading(false);

      router.push(`/workspace/edit-course/${result.data?.cid}`);
    } catch (e) {
      setloading(false);
      console.log(e);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Fill out the course details below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-3">
          <div>
            <label htmlFor="course-name">Course Name</label>
            <Input
              id="course-name"
              placeholder="Enter Course Name"
              onChange={(event) =>
                onHandleInputChange("name", event.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="course-desc">Course Description (Optional)</label>
            <Textarea
              id="course-desc"
              placeholder="Enter Course Description"
              onChange={(event) =>
                onHandleInputChange("description", event.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="course-chapters">No. Of Chapters</label>
            <Input
              id="course-chapters"
              type="number"
              placeholder="Enter number of chapters"
              onChange={(event) =>
                onHandleInputChange("noOfChapters", event.target.value)
              }
            />
          </div>
          <div className="flex gap-3 items-center">
            <label>Include Video</label>
            <Switch
              checked={formData.includeVideo}
              onCheckedChange={(checked) =>
                onHandleInputChange("includeVideo", checked)
              }
            />
          </div>
          <div>
            <label>Difficulty Level</label>
            <Select
              onValueChange={(value) => onHandleInputChange("level", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Difficulty Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="course-category">Category</label>
            <Input
              id="course-category"
              placeholder="Enter Category (separated by commas)"
              onChange={(event) =>
                onHandleInputChange("category", event.target.value)
              }
            />
          </div>
          <div className="mt-5">
            <Button className="w-full" onClick={onGenerate} disabled={loading}>
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <Sparkle className="mr-2" />
              )}{" "}
              Generate Course
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewCourseDialog;
