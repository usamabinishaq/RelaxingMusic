package com.relaxingmusic;

import static android.content.ContentValues.TAG;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.supersami.foregroundservice.ForegroundService;
import com.supersami.foregroundservice.ForegroundServiceTask;
import com.zmxv.RNSound.RNSoundModule;
import com.zmxv.RNSound.RNSoundPackage;

public class MainActivity extends ReactActivity {
  public boolean isOnNewIntent = false;

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    isOnNewIntent = true;

    ForegroundEmitter(intent);
  }


  @Override
  protected void onStart() {
    super.onStart();
    if(isOnNewIntent == true){
    }else {
      ForegroundEmitter(getIntent());
    }
  }
  public  void  ForegroundEmitter(Intent intent){
    // this method is to send back data from java to javascript so one can easily
    // know which button from notification or the notification button is clicked
    String  main = intent.getStringExtra("mainOnPress");
    String  btn =intent.getStringExtra("buttonOnPress");
    

    WritableMap map = Arguments.createMap();
    if (main != null) {
      map.putString("main", main);
    }
    if (btn != null) {

      map.putString("button", btn);
      stopService(new Intent(this.getApplicationContext(), ForegroundService.class));
      finish();
      System.exit(0);
    }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RelaxingMusic";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }
}
