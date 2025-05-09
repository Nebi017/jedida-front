import React from "react";

function NewsletterBox() {
  const onSubmitHandler = () => {
    event.preventDefault();
  };
  return (
    <div className="text-center mt-30">
      <p className="text:2xl font-meduim text-gray-800">
        Subsribe now and get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        {" "}
        Subscribe now & get 20% off Join our community and enjoy an exclusive
        20% discount on your first purchase
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-one"
          type="email"
          placeholder="Enter your emial"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

export default NewsletterBox;
