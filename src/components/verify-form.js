import { useForm } from "react-hook-form";

function VerifyForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="">
      <div className="text-md font-bold mb-2">
        You need to verify your identity to claim the account
      </div>
      <div>
        Required steps:
      </div>
      <ul className="mb-4">
        <li>1. Tweet "Artemis"</li>
        <li>2. Provide the url to the tweet</li>
        <li>3. Click Verify</li>
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Tweet URL"
          className="border-2 border-slate-200 w-full rounded-md px-2 py-2 mb-2"
          {...register("tweetURL", { required: true })} 
        />
        {errors.tweetURL && (
          <span className="text-red-500">Tweet URL is required</span>
        )}
        
        <input 
          type="submit"
          value="Verify"
          className="bg-blue-600 py-2 px-4 text-white rounded-md"
        />
      </form>
    </div>
  );
}

export default VerifyForm;
