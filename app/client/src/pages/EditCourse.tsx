import { ArrowLongLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Form, Link, useActionData, useLoaderData } from 'react-router-dom';
import { AdminInput, AdminTextArea, CardPreview } from '../components';
import { useEffect, useState } from 'react';
import { Course } from '../types/courseType';

const EditCourse = () => {
  document.title = `Edit course`;
  const errors = useActionData();
  const [responseError, setResponseError] = useState<string | null>(null);
  const course = useLoaderData() as Course;

  useEffect(() => {
    if (typeof errors === 'string') {
      setResponseError(errors);
    }
  }, [errors]);

  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    course.thumbnail
  );
  const [formValues, setFormValues] = useState({
    title: course.title,
    slogan: course.slogan,
    duration: course.duration,
    thumbnail: undefined as File | undefined,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      setFormValues((prev) => ({ ...prev, thumbnail: file }));
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="p-side">
        <div className="mb-8 w-full max-w-screen-wide mx-auto">
          <Link
            to={'/admin/courses'}
            className="w-max flex gap-2 items-center cursor-pointer hover:text-neutral-400 transition-colors duration-200 mb-6"
          >
            <ArrowLongLeftIcon className="h-5" />
            <p className="font-exo font-light ">Manage courses</p>
          </Link>
        </div>
      </div>

      <div className="p-side mb-16">
        <Form
          method="patch"
          encType="multipart/form-data"
          className="relative w-full max-w-screen-wide mx-auto font-exo course-grid gap-6"
        >
          <div className="flex flex-col gap-4 min-w-xl w-full">
            <h2 className="heading-3 mb-0">Details</h2>
            {responseError && (
              <p className="text-red-light font-light">*{responseError}</p>
            )}
            <AdminInput
              label="Title (required)*"
              name="title"
              onChange={handleInputChange}
              defaultValue={course.title}
              placeholder="Add a title that describe your course"
            />
            <AdminInput
              label="Slogan (required)*"
              type="text"
              name="slogan"
              defaultValue={course.slogan}
              onChange={handleInputChange}
              placeholder="Add a catchy slogan for your course"
            />
            <AdminInput
              label="Duration (required)*"
              type="text"
              name="duration"
              defaultValue={course.duration}
              onChange={handleInputChange}
              placeholder="An approximate duration of your course"
            />

            <AdminTextArea defaultValue={course.description} />

            <div className="flex flex-col gap-2">
              <h3>Thumbnail (required)*</h3>
              <p className="text-light-gray font-light text-sm">
                Select a picture that will represent the course.
              </p>

              <div className="w-max">
                <label
                  htmlFor="thumbnail"
                  className={`text-light-gray flex flex-col items-center border-[1px] border-neutral-500 rounded-md p-4 cursor-pointer hover:bg-neutral-800 transition-colors duration-200
				`}
                >
                  <PhotoIcon className="h-8" strokeWidth={0.8} />
                  <p className="text-xs">Upload Thumbnail</p>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id="thumbnail"
                  name="thumbnail"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="w-max">
            <h3 className="heading-3">Preview</h3>
            <CardPreview
              label={formValues.title}
              slogan={formValues.slogan}
              imageSrc={thumbnailUrl}
              duration={formValues.duration}
            />
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-50 border-t-[1px] border-neutral-800 bg-neutral-950 bg-opacity-80 backdrop-blur-sm">
            <div className="relative max-w-screen-wide mx-auto w-full flex justify-end p-side  py-4">
              <div className="flex gap-6 text-lg">
                <Link
                  to={'/admin/courses'}
                  className="text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </Link>
                <button className="text-red-light hover:text-red-light-dark transition-colors duration-200">
                  Create
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
export default EditCourse;
