import { Card, CardContent } from "../component/UI/Card";
import "rc-slider/assets/index.css";
import Slider, { Handle } from "rc-slider";
import Tooltip from "rc-tooltip";
import { useSettingContext } from "../context/Settings";
import { Button } from "../component/UI/Button";
import { getData, putData } from "../services/api";
import { Settings } from "../types";
import { useEffect } from "react";

const CustomHandle = (props: any) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const SettingPage = () => {
  const { setSettings, settings } = useSettingContext();

  const handleShortBreakDurationChange = (value: any) => {
    setSettings({ ...settings, shortBreakDuration: value });
  };

  const handleLongBreakDurationChange = (value: any) => {
    setSettings({ ...settings, longBreakDuration: value });
  };

  const handleLongBreakIntervalChange = (value: any) => {
    setSettings({ ...settings, longBreakInterval: value });
  };

  const saveHandler = async () => {
    const data = await putData<Settings>("/settings", settings);
    console.log("settings response", data);
  };

  const getSettings = async () => {
    const data = await getData<Settings>("/settings");
    if (data.id) {
      setSettings({
        shortBreakDuration: data.shortBreakDuration,
        longBreakDuration: data.longBreakDuration,
        longBreakInterval: data.longBreakInterval,
      });
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto my-8">
      <CardContent className="p-6 px-10">
        <h2 className="text-2xl font-bold">Settings</h2>

        <div className="py-6">
          <p className="my-3">Short Break Duration</p>
          <Slider
            min={5}
            max={25}
            value={settings.shortBreakDuration}
            marks={{ 5: "5min", 15: "15min", 25: "25min" }}
            step={1}
            handle={CustomHandle}
            onChange={handleShortBreakDurationChange}
            trackStyle={{ backgroundColor: "hsl(222.2 47.4% 11.2%)" }} // Customize the track color
            handleStyle={{
              borderColor: "hsl(222.2 47.4% 11.2%)",
              height: 20,
              width: 20,
              backgroundColor: "#fff",
            }}
            railStyle={{ backgroundColor: "#ddd" }}
            dotStyle={{ borderColor: "hsl(222.2 47.4% 11.2%)" }}
          />
        </div>

        <div className="py-6">
          <p className="my-3">Long Break Duration</p>
          <Slider
            min={15}
            max={100}
            value={settings.longBreakDuration}
            marks={{ 15: "15min", 30: "30min", 60: "60min", 100: "100min" }}
            step={1}
            handle={CustomHandle}
            onChange={handleLongBreakDurationChange}
            trackStyle={{ backgroundColor: "hsl(222.2 47.4% 11.2%)" }} // Customize the track color
            handleStyle={{
              borderColor: "hsl(222.2 47.4% 11.2%)",
              height: 20,
              width: 20,
              backgroundColor: "#fff",
            }}
            railStyle={{ backgroundColor: "#ddd" }}
            dotStyle={{ borderColor: "hsl(222.2 47.4% 11.2%)" }}
          />
        </div>

        <div className="py-6">
          <p className="my-3">Intervals</p>
          <Slider
            min={1}
            max={5}
            value={settings.longBreakInterval}
            marks={{
              1: "1",
              2: "2",
              3: "3",
              4: "4",
              5: "5",
            }}
            step={1}
            handle={CustomHandle}
            onChange={handleLongBreakIntervalChange}
            trackStyle={{ backgroundColor: "hsl(222.2 47.4% 11.2%)" }} // Customize the track color
            handleStyle={{
              borderColor: "hsl(222.2 47.4% 11.2%)",
              height: 20,
              width: 20,
              backgroundColor: "#fff",
            }}
            railStyle={{ backgroundColor: "#ddd" }}
            dotStyle={{ borderColor: "hsl(222.2 47.4% 11.2%)" }}
          />
        </div>
        <Button className="mt-8" onClick={saveHandler}>
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingPage;
