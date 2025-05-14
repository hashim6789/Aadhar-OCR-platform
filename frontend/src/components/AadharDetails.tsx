import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IRecord } from "@/types/IRecord";

interface AadharDetailsProps {
  record: IRecord;
  isOpen: (open: boolean) => void;
}

export default function AadharDetails({ record, isOpen }: AadharDetailsProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Aadhar Card Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {record.aadharNo && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Aadhar Number:</span>
              <span>{record.aadharNo}</span>
            </div>
          )}
          {record.name && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Name:</span>
              <span>{record.name}</span>
            </div>
          )}
          {record.dob && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Date of Birth:</span>
              <span>{formatDate(record.dob)}</span>
            </div>
          )}
          {record.gender && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Gender:</span>
              <span className="capitalize">{record.gender}</span>
            </div>
          )}
          {record.address && (
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Address:</span>
              <span className="max-w-md text-right">{record.address}</span>
            </div>
          )}
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Created At:</span>
            <span>{formatDate(record.createdAt)}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {record.frontImageUrl && (
              <div>
                <p className="font-semibold mb-2">Front Image:</p>
                <img
                  src={record.frontImageUrl}
                  alt="Aadhar Front"
                  className="w-full h-48 object-contain rounded-lg border"
                />
              </div>
            )}
            {record.backImageUrl && (
              <div>
                <p className="font-semibold mb-2">Back Image:</p>
                <img
                  src={record.backImageUrl}
                  alt="Aadhar Back"
                  className="w-full h-48 object-contain rounded-lg border"
                />
              </div>
            )}
          </div>
          <div className="text-center mt-6">
            <Button onClick={() => isOpen(false)}>Go to Home</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
