import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CloudUploadIcon } from "@/components/CloudUploadIcon";
import AadharDetails from "@/components/AadharDetails";
import { useAadharUpload } from "@/hooks/useAadharUpload";
import { useAadharFetch } from "@/hooks/useAadharFetch";
import AadharFetchForm from "@/components/AadharFetchForm";

export default function LandingPagePage() {
  const {
    frontPreview,
    backPreview,
    error: uploadError,
    isLoading: uploadLoading,
    record: uploadRecord,
    frontInputRef,
    backInputRef,
    errors: uploadErrors,
    isResultOpen,
    setIsResultOpen,
    handleSubmit: handleUploadSubmit,
    onSubmit: onUploadSubmit,
    handleFileChange,
    handleDrop,
    handleDragOver,
    setFrontPreview,
    setBackPreview,
  } = useAadharUpload();

  const {
    error: fetchError,
    isLoading: fetchLoading,
    record: fetchRecord,
    // register,
    // handleSubmit: handleFetchSubmit,
    // errors: fetchErrors,
    onSubmit: onFetchSubmit,
  } = useAadharFetch();

  // Show AadharDetails if either form returns a record (prioritize latest)
  const record = uploadRecord || fetchRecord;
  if (record && isResultOpen) {
    return <AadharDetails record={record} isOpen={setIsResultOpen} />;
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold text-center">Aadhar Card Details</h1>
      {(uploadError || fetchError) && (
        <p className="text-red-500 text-center">{uploadError || fetchError}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Aadhar Images</CardTitle>
            <CardDescription>
              Upload front and back images of your Aadhar card
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form
              onSubmit={handleUploadSubmit(onUploadSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                {/* Front Image */}
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-4"
                  onDrop={(e) => handleDrop(e, "frontImage", setFrontPreview)}
                  onDragOver={handleDragOver}
                >
                  {frontPreview ? (
                    <img
                      src={frontPreview}
                      alt="Front Preview"
                      className="max-w-full h-48 object-contain"
                    />
                  ) : (
                    <CloudUploadIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={frontInputRef}
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(
                        e.target.files?.[0] || null,
                        "frontImage",
                        setFrontPreview
                      )
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => frontInputRef.current?.click()}
                    disabled={uploadLoading}
                  >
                    Select Front Image
                  </Button>
                  {uploadErrors.frontImage && (
                    <p className="text-red-500 text-sm">
                      {uploadErrors.frontImage.message}
                    </p>
                  )}
                </div>

                {/* Back Image */}
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-6 space-y-4"
                  onDrop={(e) => handleDrop(e, "backImage", setBackPreview)}
                  onDragOver={handleDragOver}
                >
                  {backPreview ? (
                    <img
                      src={backPreview}
                      alt="Back Preview"
                      className="max-w-full h-48 object-contain"
                    />
                  ) : (
                    <CloudUploadIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={backInputRef}
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(
                        e.target.files?.[0] || null,
                        "backImage",
                        setBackPreview
                      )
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => backInputRef.current?.click()}
                    disabled={uploadLoading}
                  >
                    Select Back Image
                  </Button>
                  {uploadErrors.backImage && (
                    <p className="text-red-500 text-sm">
                      {uploadErrors.backImage.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={uploadLoading}
                  className="w-full"
                >
                  {uploadLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                      <span className="ml-2">Uploading...</span>
                    </div>
                  ) : (
                    "Submit for OCR"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Aadhar Number and DOB Fetch Form */}
        <AadharFetchForm
          onFetchSubmit={onFetchSubmit}
          fetchLoading={fetchLoading}
        />
        {record && (
          <div className="text-center mt-6">
            <Button onClick={() => setIsResultOpen(true)}>Go to Result</Button>
          </div>
        )}
      </div>
    </div>
  );
}
