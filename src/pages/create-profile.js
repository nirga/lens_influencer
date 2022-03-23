import { useForm } from "react-hook-form";
import Navigation from "../components/navigation";
import TopHunts from "../components/topHunts";

function CreateProfile() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  
  return (
    <div className="grid grid-cols-6 gap-4 mx-4 bg-slate-50">
        <Navigation/>
        <div className="col-span-3 bg-slate-50">
            <div className="pt-4">
                <div className="bg-white w-full rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-4">
                        <p className="text-md font-bold mb-4">Create a new Profile</p>
                        <p className="text-md">Name</p>
                        <input
                            className="border-2 border-slate-200 w-full rounded-md px-2"
                            {...register("name")}
                        />
                        <p className="text-md mt-2">Twitter profile url</p>
                        <input
                            className="border-2 border-slate-200 w-full rounded-md px-2"
                            type="url"
                            {...register("twitterRequired", { required: true })}
                        />
                        {errors.twitterRequired && <span className="text-red-500">Twitter url is required</span>}

                        <div className="w-full flex justify-end mt-4">
                            <input 
                              type="submit"
                              value="Create"
                              className="bg-blue-600 py-2 px-4 text-white rounded-md"
                            />

                        </div>
                    </form>
                </div>
            </div>
        </div>
        <TopHunts/>
    </div>
  );
}

export default CreateProfile;
